# Lineout Brewing website: setup guide

This folder is the whole website. It is plain files, so it needs no server, database or login.

| File | What it is |
|---|---|
| index.html | The website |
| taps.json | Which beers show "On tap now" (you edit this one) |
| favicon.svg | Browser tab icon |
| robots.txt, _headers | Search engines and caching (leave as is) |

The page loads three fonts from Google Fonts. Everything else is inside index.html.

## Part 1: Put the site online (about 20 minutes)

Recommended host: Cloudflare Pages (free, fast, HTTPS included). Netlify works the same way. Menu names on these sites change from time to time, so follow the idea if a label differs.

1. Create a free account at cloudflare.com.
2. In the dashboard, go to Workers & Pages, then Create, then Pages, then upload your own files (direct upload).
3. Name the project `lineoutbrewing`, then drag in this whole folder (or the zip) and deploy. You will get a test address like `lineoutbrewing.pages.dev`. Open it to check the site.

## Part 2: Connect lineoutbrewing.com (GoDaddy stays your registrar)

Easiest and cleanest: let Cloudflare run the DNS and leave the domain registered at GoDaddy.

1. In Cloudflare, choose Add a site and enter `lineoutbrewing.com`. Pick the free plan. Cloudflare shows two nameservers (names ending in `.ns.cloudflare.com`).
2. At GoDaddy, open your domain, go to DNS, then Nameservers, then Change. Choose to use your own (custom) nameservers and paste in the two Cloudflare ones. Save.
3. Back in Cloudflare, open your Pages project, then Custom domains, then Set up a domain. Add `lineoutbrewing.com` and `www.lineoutbrewing.com`. Cloudflare creates the DNS records for you.
4. Wait. This can take a few minutes to a few hours. HTTPS turns on by itself.

You said the old email is gone, so there are no mail records to protect. If you set up email later, add its records in Cloudflare's DNS page.

Alternative without moving nameservers: at GoDaddy add a CNAME record for `www` pointing to `lineoutbrewing.pages.dev`, and set GoDaddy domain forwarding from the bare domain to `https://www.lineoutbrewing.com`. This works, but the bare domain forwarding is less reliable over HTTPS, so I prefer the Cloudflare route.

## Part 3: Show what is on tap

Open `taps.json`. It looks like this:

```
{
  "master": true,
  "tap": { "1": true, "5": true, "1c": true }
}
```

- `"master"` is the main switch. `false` hides every marker and the On tap now filter. `true` shows them.
- Each beer has a key: the main beer is its number, its Coach's Cut is the number plus `c`. Add `"7": true` to mark beer 7 on tap, and delete the line to clear it.
- Keep commas between lines and no comma after the last line. If the file is invalid, the site simply shows no markers.

To publish a change: edit `taps.json`, then upload the folder again (Pages, your project, Create deployment). If you want editing in one click, put these files in a free GitHub repository and connect it to Cloudflare Pages: then editing `taps.json` on github.com and clicking Commit updates the live site in about a minute.

## Tap keys

| Key | Starting XV beer | Key | Coach's Cut |
|---|---|---|---|
| 1 | Loosehead Brown | 1c | Rolling Maul |
| 2 | The Hooker Amber | 2c | Ruck |
| 3 | Tighthead Porter | 3c | Pick and Go |
| 4 | Engine Room Double IPA | 4c | Hospital Pass |
| 5 | Jumper IPA | 5c | Crash Ball |
| 6 | Blindside Rye Pale Ale | 6c | Turnover |
| 7 | Openside Pale Ale | 7c | Jackal |
| 8 | Number Eight Imperial Stout | 8c | Penalty Try |
| 9 | Scrum-Half Kölsch | 9c | Grubber |
| 10 | Fly-Half Hazy IPA | 10c | Dummy Pass |
| 11 | Wing Prickly Pear Wheat | 11c | Sidestep |
| 12 | Inside Centre Pilsner | 12c | Overlap |
| 13 | Outside Centre Saison | 13c | Loop Play |
| 14 | Right Wing Agave Blonde | 14c | Cut-Out Pass |
| 15 | Fullback Desert Lager | 15c | Box Kick |
| 16 | Impact Sub Märzen | 16c | Garryowen |
| 17 | Fresh Legs Milk Stout | 17c | Offload |
| 18 | Second Wind Scotch Ale | 18c | Advantage |
| 19 | Finisher Barleywine | 19c | Drop Goal |
| 20 | Sin Bin Green Chile Cream Ale | 20c | Quick Throw |
| 21 | Quick Tap Lime Gose | 21c | Touch Finder |
| 22 | Utility Back Cold IPA | 22c | Gain Line |
| 23 | Game Breaker Dunkel | 23c | Charge Down |

## Changing the site later

Ask Claude to update the beers, prices or wording, and replace `index.html` with the new file. Keep `taps.json` unless you changed the beer list.

Before you go public: the Taproom section holds sample hours and a "[Street address]" placeholder. Search index.html for `[Street address]` and `class="hours"` and replace them with real details, and add a real contact method (the domain has no email yet).

## Email signup ("Get on the team sheet")

The page has a signup form (section `#join`). It does nothing until you connect an email service, because a static site cannot store emails itself.

Simplest setup (Buttondown, free for a small list):
1. Make a free account at buttondown.com and note your username.
2. In `index.html`, find `YOUR-BUTTONDOWN-USERNAME` in the form action and replace it with your username.
3. Re-upload the site. New signups appear in your Buttondown dashboard, and Buttondown handles the confirmation email and unsubscribe links.

Other services (MailerLite, Mailchimp, Kit) also work, but each gives you its own form action URL and field names. Replace the form's `action`, and change the email input's `name` to what that service expects.

Until the action is set, the form shows a message asking people to email info@lineoutbrewing.com. The form requires a 21+ checkbox. A hidden trap field catches simple bots. Have your attorney review the signup wording before you start marketing beer.
