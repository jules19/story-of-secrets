import type { Chapter } from '../types';

export const ch09: Chapter = {
  id: 'ch-tls',
  era: 'network',
  number: 'IX',
  kicker: 'Everywhere · 1995–present',
  title: 'The invisible lock',
  lede: 'The most-used cryptography in history is the kind nobody notices: four thousand years of hard-won ideas, executed in milliseconds, every time a page loads.',
  blocks: [
    {
      kind: 'p',
      html: `Commerce dragged cryptography onto the internet. Netscape needed credit cards to feel safe crossing the open web, and shipped SSL in 1995; its cleaned-up descendant became TLS 1.0 in 1999 (RFC 2246), and the modern protocol, TLS 1.3, arrived in 2018 (RFC 8446) with the obsolete parts amputated and forward secrecy made the norm. Behind the padlock, three distinct cryptographic jobs run in sequence — and each one answers a failure you have already seen in this museum.`,
      sources: ['rfc2246', 'rfc8446'],
    },
    {
      kind: 'p',
      html: `<em>Authentication</em> answers Walsingham: certificates and digital signatures establish that you are talking to the site you named, not to a forger on the path. <em>Key establishment</em> answers the courier problem: an ephemeral Diffie–Hellman exchange conjures fresh secret keys across a hostile wire, discarded when the session ends. <em>Bulk encryption</em> answers the volume problem: fast symmetric ciphers with built-in integrity seals carry the actual conversation. Three eras of the story — Renaissance forgery, 1970s mathematics, machine-age throughput — bolted together in one round trip.`,
      sources: ['rfc8446'],
    },
    {
      kind: 'exhibit',
      id: 'tls',
      title: 'One tap, three kinds of cryptography',
      teaches:
        'The distinct roles of authentication, key establishment and bulk encryption in a TLS connection — and what specifically breaks if any one of them is removed.',
      fallback:
        'A six-stage walkthrough of a TLS 1.3-shaped handshake between a phone and a bank. Each stage shows the messages crossing the wire, explains its job in plain language, and answers “what breaks without this?” with a real historical failure — including the DigiNotar certificate-authority collapse of 2011.',
      note: 'Message flow simplified from RFC 8446 (session resumption, extensions and error paths omitted).',
    },
    {
      kind: 'p',
      html: `The lock’s weak joint is the same one Chapter VII flagged: trust in <em>whose key this is</em>. Your browser trusts a list of certificate authorities; every one of them can vouch for any site on earth. In 2011 a Dutch CA, DigiNotar, was compromised; rogue certificates — including for major webmail services — were issued and used to intercept users in Iran before detection. The CA went bankrupt; browsers grew audit mechanisms (certificate transparency logs) in response. The institution failed, and the repair was Kerckhoffs-shaped: more publicity, not more secrecy — certificates now go into public, append-only logs that anyone can audit.`,
      sources: ['diginotar'],
    },
    {
      kind: 'p',
      html: `And then encryption quietly won the web. For twenty years HTTPS was the exception — it cost money and effort, so it guarded checkouts and little else. Let’s Encrypt (launched publicly in late 2015) made certificates free and automatic, and browser telemetry shows the majority of page loads worldwide crossing to HTTPS around 2017–18, climbing steadily since. Read this against the Crypto Wars: the argument about whether ordinary people should have strong cryptography was settled less by law than by default settings. Nobody decided to encrypt their life. The infrastructure decided for them — which is precisely why almost nobody can see the most consequential cryptography ever deployed.`,
      sources: ['rfc8446', 'levy2001'],
    },
    {
      kind: 'pull',
      html: `Mary needed a corrupt brewer and got a forged postscript. You get authenticated, forward-secret correspondence with every tap — and never once see it happen.`,
    },
  ],
};
