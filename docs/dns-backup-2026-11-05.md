# DNS-Sicherung church-mannheim.com (IONOS), 05.11.2026, vor Umzug

| Typ | Host | Wert | Dienst |
|---|---|---|---|
| CNAME | _domainconnect | _domainconnect.ionos.com | Domain Connect |
| A | www | 185.158.133.1 | Lovable |
| TXT | _lovable.www | lovable_verify=5e63bc87… | Lovable |
| MX | @ | mx00.ionos.de | Mail |
| MX | @ | mx01.ionos.de | Mail |
| TXT | @ | v=spf1 include:_spf-eu.ionos.com ~all | Mail |
| CNAME | _dmarc | dmarc.ionos.de | Mail |
| CNAME | s1-ionos._domainkey | s1.dkim.ionos.com | Mail |
| CNAME | s2-ionos._domainkey | s2.dkim.ionos.com | Mail |
| CNAME | autodiscover | adsredir.ionos.info | Mail |
| A | @ | 185.158.133.1 | Lovable |
| TXT | _lovable | lovable_verify=a07a360d… | Lovable |

Zurückdrehen nach Vercel-Umstellung: A-Records @ und www wieder auf 185.158.133.1.

## Stand nach Umzug (05.11.2026, 21:45)

| Typ | Host | Wert | Zweck |
|---|---|---|---|
| A | @ | 216.198.79.1 | Vercel (leitet per 308 auf www) |
| A | www | 216.198.79.1 | Vercel |
| MX | send | feedback-smtp.eu-west-1.amazonses.com (10) | Resend |
| TXT | send | v=spf1 include:amazonses.com ~all | Resend |
| TXT | resend._domainkey | p=MIGfMA0… | Resend DKIM |

Unverändert: MX @ (IONOS), SPF @, _dmarc, s1/s2-ionos._domainkey, autodiscover, _domainconnect.
Entfernt durch IONOS beim Umstellen: TXT _lovable.www. Noch vorhanden: TXT _lovable (beim Aufräumen löschen).
