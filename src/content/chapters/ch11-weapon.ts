import type { Chapter } from '../types';

export const ch11: Chapter = {
  id: 'ch-weapon',
  era: 'network',
  number: 'XI',
  kicker: 'Everywhere · 1989–present',
  title: 'The weapon turned around',
  lede: 'This museum has treated encryption as armour. The same mathematics makes a siege engine: point strong cryptography at someone else’s data and demand rent for the key.',
  blocks: [
    {
      kind: 'p',
      html: `In December 1989, some twenty thousand diskettes labelled “AIDS Information” arrived in the mail at addresses harvested from a conference list. The software inside, after a delay, scrambled victims’ file names and demanded $189 be sent to a post-office box in Panama — the work of Joseph Popp, a biologist whose motives remain murky. The cryptography was weak (symmetric, with the key recoverable from the code) and recovery tools followed quickly. But the design was ahead of its time by a quarter century: encryption used not to protect the data’s owner, but against them.`,
      sources: ['aids-trojan'],
    },
    {
      kind: 'p',
      html: `Academia saw the future before the criminals built it. In 1996 Adam Young and Moti Yung described “cryptovirology”: malware carrying only a <em>public</em> key, so that files are locked toward a private key that never touches the victim’s machine — extortion built on exactly the mathematics of Chapter VII, with the defender’s asymmetry handed to the attacker. Their warning waited for infrastructure: broadband to spread, and — decisively — cryptocurrency to collect. CryptoLocker (2013) assembled the full modern kit: public-key file encryption, payment in Bitcoin, professional-grade key handling on criminal servers. When an international operation took down its network in 2014, the business model had already replicated.`,
      sources: ['young-yung'],
    },
    {
      kind: 'p',
      html: `Then it touched hospitals. In May 2017 <strong>WannaCry</strong> spread worm-fashion through a Windows vulnerability called EternalBlue — an exploit developed by the NSA and published by a leak group weeks earlier — encrypting machines in more than 150 countries and forcing parts of Britain’s National Health Service to divert patients. Its spread stopped partly through luck: a researcher, Marcus Hutchins, registered an unregistered domain he found in the code, which acted as a kill switch. The US and UK governments publicly attributed the attack to North Korea that December. Every thread of this museum knots together here: state-built attack tools, public-key mathematics, key management run <em>competently by the attacker</em> — and the human cost of cryptography working exactly as designed, for the wrong party.`,
      sources: ['wannacry-gov'],
    },
    {
      kind: 'pull',
      html: `Ransomware is the contest inverted: for once, the codebreakers are the victims, and the cipher-makers demand the ransom.`,
    },
    {
      kind: 'p',
      html: `It is tempting to draw a tidy moral — that strong cryptography was a mistake to spread. The record resists it. The same properties that lock a hospital’s files also lock the hospital’s patient records against thieves, journalists’ sources against reprisal, and everyone’s banking against the wire’s many listeners; the ransom economy runs on stolen access and unpatched systems at least as much as on mathematics, and none of its enabling factors can be uninvented selectively. What ransomware honestly teaches is narrower and older: cryptography is power over information, power is dual-use, and — as with Walsingham, the black chambers and the export wars — <em>who holds the keys</em> is always the real question. This museum’s last room is about the next contest for them.`,
      sources: ['young-yung', 'levy2001'],
    },
  ],
};
