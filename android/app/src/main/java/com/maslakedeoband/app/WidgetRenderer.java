package com.maslakedeoband.app;

import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.graphics.RectF;
import android.graphics.Typeface;
import android.text.Layout;
import android.text.StaticLayout;
import android.text.TextDirectionHeuristics;
import android.text.TextPaint;

import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.chrono.HijrahDate;
import java.time.temporal.ChronoField;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Locale;

public class WidgetRenderer {
    private static final String[] HM = {"محرم", "صفر", "ربیع الاول", "ربیع الثانی", "جمادی الاول",
            "جمادی الثانی", "رجب", "شعبان", "رمضان", "شوال", "ذی قعدہ", "ذی الحجہ"};
    private static final String[] GM = {"جنوری", "فروری", "مارچ", "اپریل", "مئی", "جون",
            "جولائی", "اگست", "ستمبر", "اکتوبر", "نومبر", "دسمبر"};
    private static final String[] WD = {"اتوار", "پیر", "منگل", "بدھ", "جمعرات", "جمعہ", "ہفتہ"};
    private static final String[] PN = {"فجر", "ظہر", "عصر", "مغرب", "عشاء"};

    static final long HIJRI_ADJ = -1;        // 0 ya +1 karke dekh sakte hain
    static final float URDU_SPACING = 0.8f;  // Urdu lines zyada door lagen to kam karein

    private static StaticLayout layout(String text, TextPaint tp, int w, boolean rtl, float spacing) {
        return StaticLayout.Builder.obtain(text, 0, text.length(), tp, w)
                .setAlignment(Layout.Alignment.ALIGN_CENTER)
                .setTextDirection(rtl ? TextDirectionHeuristics.RTL : TextDirectionHeuristics.LTR)
                .setLineSpacing(0f, spacing)
                .build();
    }

    private static TextPaint tp(Typeface face, float size, int color) {
        TextPaint p = new TextPaint(Paint.ANTI_ALIAS_FLAG);
        p.setTypeface(face);
        p.setTextSize(size);
        p.setColor(color);
        return p;
    }

    public static Bitmap render(Context ctx) {
        ZoneId zone = ZoneId.of("Asia/Kolkata");
        ZonedDateTime now = ZonedDateTime.now(zone);
        LocalDate today = now.toLocalDate();
        long nowMs = now.toInstant().toEpochMilli();

        // pichli aur agli namaz
        List<long[]> ev = new ArrayList<>();
        for (int k = -1; k <= 1; k++) {
            long[] ts = PrayerCalc.dayTimes(today.plusDays(k));
            for (int i = 0; i < 5; i++) ev.add(new long[]{i, ts[i]});
        }
        Collections.sort(ev, (a, b) -> Long.compare(a[1], b[1]));
        int ni = 0;
        while (ni < ev.size() - 1 && ev.get(ni)[1] <= nowMs) ni++;
        long[] next = ev.get(ni);
        long[] prev = ev.get(Math.max(ni - 1, 0));

        float frac = (float) (nowMs - prev[1]) / (float) (next[1] - prev[1]);
        frac = Math.max(0f, Math.min(1f, frac));
        ZonedDateTime nextClock = ZonedDateTime.ofInstant(Instant.ofEpochMilli(next[1]), zone);
        int mins = (int) ((next[1] - nowMs) / 60000) + 1;

        HijrahDate h = HijrahDate.from(today.plusDays(HIJRI_ADJ));
        String hijri = h.get(ChronoField.DAY_OF_MONTH) + " "
                + HM[h.get(ChronoField.MONTH_OF_YEAR) - 1] + " "
                + h.get(ChronoField.YEAR);
        String greg = GM[today.getMonthValue() - 1] + " " + today.getDayOfMonth() + " "
                + WD[today.getDayOfWeek().getValue() % 7];
        String left = (mins >= 60 ? (mins / 60) + " گھنٹے " : "") + (mins % 60) + " منٹ باقی";
        String nextLine = PN[(int) next[0]] + " "
                + String.format(Locale.US, "%02d:%02d", nextClock.getHour(), nextClock.getMinute());
        String clock = String.format(Locale.US, "%02d:%02d", now.getHour(), now.getMinute());

        // drawing
        int s = 600;
        Bitmap bmp = Bitmap.createBitmap(s, s, Bitmap.Config.ARGB_8888);
        Canvas c = new Canvas(bmp);
        float stroke = s * 0.035f;
        float r = s / 2f - stroke;
        Paint p = new Paint(Paint.ANTI_ALIAS_FLAG);

        p.setStyle(Paint.Style.FILL);
        p.setColor(0xFF0A0F14);
        c.drawCircle(s / 2f, s / 2f, r, p);
        p.setStyle(Paint.Style.STROKE);
        p.setStrokeWidth(stroke);
        p.setColor(0xFF26343F);
        c.drawCircle(s / 2f, s / 2f, r, p);
        p.setColor(0xFF22BFA5);
        c.drawArc(new RectF(s / 2f - r, s / 2f - r, s / 2f + r, s / 2f + r), -90f, frac * 360f, false, p);

        Typeface urdu = Typeface.createFromAsset(ctx.getAssets(), "fonts/NotoNastaliqUrdu-Regular.ttf");
        Typeface light = Typeface.create("sans-serif-light", Typeface.NORMAL);

        int w = (int) (s * 0.70f);
        List<StaticLayout> items = new ArrayList<>();
        items.add(layout(hijri, tp(urdu, 32f, Color.WHITE), w, true, URDU_SPACING));
        items.add(layout(greg, tp(urdu, 28f, Color.WHITE), w, true, URDU_SPACING));
        items.add(layout(clock, tp(light, 120f, Color.WHITE), w, false, 1f));
        items.add(layout("Hatimuria, Assam", tp(Typeface.SANS_SERIF, 28f, Color.WHITE), w, false, 1f));
        items.add(layout(nextLine, tp(urdu, 30f, Color.WHITE), w, true, URDU_SPACING));
        items.add(layout(left, tp(urdu, 22f, 0xFFB7C4CC), w, true, URDU_SPACING));

        int total = 0;
        for (StaticLayout l : items) total += l.getHeight();
        float y = (s - total) / 2f;
        for (StaticLayout l : items) {
            c.save();
            c.translate((s - w) / 2f, y);
            l.draw(c);
            c.restore();
            y += l.getHeight();
        }
        return bmp;
    }
}