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
