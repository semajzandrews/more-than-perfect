/* Verified facts only (recon 06-08-2026). Sources: Booksy listing 790040,
   ezlocal, directory aggregate. No fabricated names, prices, or socials. */

import { formatPhone } from "@/lib/phone";

export const BOOKSY =
  "https://booksy.com/en-us/790040_more-than-perfect_hair-salon_118492_south-orange-village";

/* PHONE DOCTRINE — one digits-only constant, everything else derived from it,
   so the display, the dialer link and the text link can never drift apart. */
export const PHONE_DIGITS = "9737635921";
export const PHONE_DISPLAY = formatPhone(PHONE_DIGITS); // (973) 763-5921

/* The text branch of the CTA. A barbershop's hardest question to answer over
   the counter is "can you do this?", so the prefill invites the reference photo
   that settles it before anyone books a chair. */
export const SMS_BODY =
  "Hi More Than Perfect, here's a photo of the cut I want. When can you get me in the chair?";
export const SMS_HINT = "Send a photo of the cut you want";

export const ADDRESS = "131 South Orange Ave";
export const CITY_STATE_ZIP = "South Orange, NJ 07079";

export const RATING = "5.0";
export const REVIEW_COUNT = 164;

/* Hours verified across the Booksy/ezlocal listings: open early, seven days. */
export const HOURS = [
  { d: "Mon to Fri", h: "6:00 AM to 8:00 PM" },
  { d: "Saturday", h: "6:00 AM to 8:00 PM" },
  { d: "Sunday", h: "6:00 AM to 8:00 PM" },
];

export const MAPS_EMBED =
  "https://www.google.com/maps?q=131+South+Orange+Ave+South+Orange+NJ+07079&output=embed";
