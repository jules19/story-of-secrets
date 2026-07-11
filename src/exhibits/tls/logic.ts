export interface TlsMessage {
  from: 'client' | 'server' | 'both' | 'note';
  text: string;
}

export interface TlsStep {
  id: string;
  title: string;
  role: 'setup' | 'authentication' | 'key-establishment' | 'bulk-encryption' | 'done';
  messages: TlsMessage[];
  explain: string;
  withoutTitle: string;
  without: string;
}

/** The journey of one HTTPS connection, told as five stations (TLS 1.3-shaped). */
export const TLS_STEPS: TlsStep[] = [
  {
    id: 'plain',
    title: 'Before the handshake',
    role: 'setup',
    messages: [
      { from: 'client', text: 'find me bank.example → DNS, routers, wifi' },
      { from: 'note', text: 'every machine on the path can read everything so far' },
    ],
    explain:
      'Your phone has found the server, but the wire is still bare. Whatever crosses it now — passwords, balances, messages — is readable by the café wifi, every router in between, and anyone tapping them.',
    withoutTitle: 'If the story stopped here',
    without:
      'This was most of the web until the 2010s: banking logins and private messages crossing shared networks in the clear. TLS exists because the path is never yours.',
  },
  {
    id: 'hello',
    title: 'Hello — agreeing how to speak',
    role: 'setup',
    messages: [
      { from: 'client', text: 'ClientHello: TLS versions + ciphers I speak, my key share' },
      { from: 'server', text: 'ServerHello: we’ll use this cipher; here is my key share' },
    ],
    explain:
      'The two machines negotiate. Modern TLS (1.3) sends the first half of a key exchange in the very first message, so agreement and key-making overlap in one round trip.',
    withoutTitle: 'Without negotiation',
    without:
      'Old and broken ciphers could never be retired. Downgrade attacks — tricking both sides into speaking the weakest common dialect — were a real class of TLS failure until the protocol learned to sign its negotiation.',
  },
  {
    id: 'auth',
    title: 'Authentication — who am I talking to?',
    role: 'authentication',
    messages: [
      { from: 'server', text: 'certificate: “this key belongs to bank.example” — signed by a CA' },
      { from: 'server', text: 'proof: a fresh signature only the certified key could make' },
      { from: 'note', text: 'your phone checks the chain against roots it already trusts' },
    ],
    explain:
      'Encryption without identity is worthless — you would just be whispering secrets to a stranger. Certificates put a chain of signatures between the site’s key and a root authority your device already trusts. Remember Walsingham forging Mary’s postscript: the oldest attack is not reading the message but becoming the correspondent.',
    withoutTitle: 'Without authentication',
    without:
      'Anyone on the path could answer in the bank’s place and run the whole encrypted conversation with you — a man-in-the-middle. This is not hypothetical: when the CA DigiNotar was hacked in 2011, rogue certificates for major sites were used against users in Iran.',
  },
  {
    id: 'keys',
    title: 'Key establishment — the Diffie–Hellman moment',
    role: 'key-establishment',
    messages: [
      { from: 'both', text: 'each side combines its secret with the other’s public share' },
      {
        from: 'note',
        text: 'both now hold the same fresh session keys; the wire never carried them',
      },
    ],
    explain:
      'The two key shares from the Hello messages now do exactly what Exhibit 4 showed: each side mixes the other’s public value with its own secret and arrives at the same session key. The keys are ephemeral — invented for this connection, discarded after.',
    withoutTitle: 'Without ephemeral keys',
    without:
      'If sessions were locked with the server’s one long-term key, then anyone who recorded traffic for years and later stole that key could open all of it retroactively. Fresh keys per session — forward secrecy — make recorded ciphertext worthless. Hold that thought for the final chapter.',
  },
  {
    id: 'bulk',
    title: 'The tunnel — bulk encryption with integrity',
    role: 'bulk-encryption',
    messages: [
      {
        from: 'both',
        text: 'AEAD records: AES-GCM or ChaCha20-Poly1305, each with an integrity tag',
      },
      { from: 'note', text: 'gigabytes per second; any tampered bit makes the record fail loudly' },
    ],
    explain:
      'Public-key mathematics is expensive, so it is used only to agree on keys. The conversation itself runs on fast symmetric ciphers, and every record carries an authentication tag — a seal that breaks if even one bit is altered in transit.',
    withoutTitle: 'Without integrity',
    without:
      'An attacker who cannot read your traffic can still flip bits in it. Early protocols that encrypted without authenticating let attackers mutate messages meaningfully — modern AEAD ciphers exist because secrecy without integrity is a half-locked door.',
  },
  {
    id: 'done',
    title: 'The padlock',
    role: 'done',
    messages: [
      { from: 'note', text: 'total elapsed: about one round trip' },
      { from: 'note', text: 'identity ✓ · fresh secret keys ✓ · sealed, private traffic ✓' },
    ],
    explain:
      'Three distinct jobs — proving identity, agreeing secrets, and sealing traffic — each done by a different kind of cryptography, assembled in milliseconds. It happens billions of times a day, and almost nobody ever sees it. This is what four thousand years of the contest built.',
    withoutTitle: 'The quiet achievement',
    without:
      'Mary needed a trusted courier and died of a forged postscript. You get authentication, key agreement and sealed correspondence with every tap, from strangers’ machines, across a hostile network. The everyday padlock is the least visible monument in this museum.',
  },
];

export interface TlsState {
  step: number;
}

export function next(s: TlsState): TlsState {
  return { step: Math.min(TLS_STEPS.length - 1, s.step + 1) };
}

export function prev(s: TlsState): TlsState {
  return { step: Math.max(0, s.step - 1) };
}

export function goto(_s: TlsState, step: number): TlsState {
  return { step: Math.min(TLS_STEPS.length - 1, Math.max(0, step)) };
}
