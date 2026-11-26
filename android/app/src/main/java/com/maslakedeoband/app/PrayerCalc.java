package com.maslakedeoband.app;

import java.time.LocalDate;
import java.time.ZoneOffset;

public class PrayerCalc {
    static final double LAT = 26.1445;   // Hatimuria / Guwahati
    static final double LNG = 91.7362;
    static final double TZ = 5.5;
    private static final double R = Math.PI / 180;

    private static double fix(double x, double n) {
        return ((x % n) + n) % n;
    }

    private static double t(double a, double dec) {
        double c = (-Math.sin(a * R) - Math.sin(dec * R) * Math.sin(LAT * R))
                / (Math.cos(dec * R) * Math.cos(LAT * R));
        c = Math.max(-1, Math.min(1, c));
        return Math.acos(c) / R / 15;
    }

    /** Fajr, Dhuhr, Asr, Maghrib, Isha ke epoch millis */
    public static long[] dayTimes(LocalDate date) {
        long base = date.atStartOfDay(ZoneOffset.UTC).toInstant().toEpochMilli();
        double jd = (base + 12 * 3600000L) / 86400000.0 + 2440587.5;
        double d = jd - 2451545.0;
        double g = fix(357.529 + 0.98560028 * d, 360);
        double q = fix(280.459 + 0.98564736 * d, 360);
        double l = fix(q + 1.915 * Math.sin(g * R) + 0.020 * Math.sin(2 * g * R), 360);
        double e = 23.439 - 3.6e-7 * d;
        double ra = fix(Math.atan2(Math.cos(e * R) * Math.sin(l * R), Math.cos(l * R)) / R / 15, 24);
        double eqt = fix(q / 15 - ra + 12, 24) - 12;
        double dec = Math.asin(Math.sin(e * R) * Math.sin(l * R)) / R;

        double noon = 12 + TZ - LNG / 15 - eqt;
        double asrA = -Math.atan(1 / (2 + Math.tan(Math.abs(LAT - dec) * R))) / R;   // Hanafi
        double[] hrs = {
                noon - t(18, dec),
                noon,
                noon + t(asrA, dec),
                noon + t(0.833, dec),
                noon + t(18, dec)
        };
        long[] out = new long[5];
        for (int i = 0; i < 5; i++) {
            out[i] = (long) (base + hrs[i] * 3600000 - TZ * 3600000);
        }
        return out;
    }
}