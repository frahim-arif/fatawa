package com.maslakedeoband.app;

import android.app.AlarmManager;
import android.app.PendingIntent;
import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.graphics.Bitmap;
import android.widget.RemoteViews;

public class NamazWidgetProvider extends AppWidgetProvider {

    static final String ACTION_TICK = "com.maslakedeoband.app.TICK";

    @Override
    public void onUpdate(Context ctx, AppWidgetManager mgr, int[] ids) {
        draw(ctx, mgr, ids);
        scheduleNext(ctx);
    }

    @Override
    public void onEnabled(Context ctx) {
        scheduleNext(ctx);
    }

    @Override
    public void onDisabled(Context ctx) {
        AlarmManager am = (AlarmManager) ctx.getSystemService(Context.ALARM_SERVICE);
        am.cancel(tickIntent(ctx));
    }

    @Override
    public void onReceive(Context ctx, Intent intent) {
        super.onReceive(ctx, intent);
        if (ACTION_TICK.equals(intent.getAction())) {
            AppWidgetManager mgr = AppWidgetManager.getInstance(ctx);
            int[] ids = mgr.getAppWidgetIds(new ComponentName(ctx, NamazWidgetProvider.class));
            if (ids.length > 0) {
                draw(ctx, mgr, ids);
                scheduleNext(ctx);
            }
        }
    }

    private void draw(Context ctx, AppWidgetManager mgr, int[] ids) {
        Bitmap bmp = WidgetRenderer.render(ctx);
        RemoteViews rv = new RemoteViews(ctx.getPackageName(), R.layout.widget_namaz);
        rv.setImageViewBitmap(R.id.img, bmp);

        Intent launch = ctx.getPackageManager().getLaunchIntentForPackage(ctx.getPackageName());
        if (launch != null) {
            PendingIntent open = PendingIntent.getActivity(ctx, 0, launch, PendingIntent.FLAG_IMMUTABLE);
            rv.setOnClickPendingIntent(R.id.img, open);
        }
        mgr.updateAppWidget(ids, rv);
    }

    private PendingIntent tickIntent(Context ctx) {
        Intent i = new Intent(ctx, NamazWidgetProvider.class).setAction(ACTION_TICK);
        return PendingIntent.getBroadcast(ctx, 1, i,
                PendingIntent.FLAG_IMMUTABLE | PendingIntent.FLAG_UPDATE_CURRENT);
    }

    private void scheduleNext(Context ctx) {
        long nextMinute = (System.currentTimeMillis() / 60000 + 1) * 60000;
        AlarmManager am = (AlarmManager) ctx.getSystemService(Context.ALARM_SERVICE);
        am.set(AlarmManager.RTC, nextMinute, tickIntent(ctx));
    }
}