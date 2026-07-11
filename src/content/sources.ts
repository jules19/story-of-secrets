import type { Source } from './types';

/**
 * Bibliography. Ids are cited from chapter content; numbering is assigned in
 * order of first citation at render time. The claim-by-claim audit lives in
 * research/sources.md.
 */
export const SOURCES: Record<string, Source> = {
  kahn: {
    label: 'Kahn 1996',
    detail:
      'David Kahn, The Codebreakers: The Story of Secret Writing. Macmillan, 1967; revised edition, Scribner, 1996.',
  },
  singh: {
    label: 'Singh 1999',
    detail: 'Simon Singh, The Code Book. Fourth Estate, 1999.',
  },
  suetonius: {
    label: 'Suetonius',
    detail:
      'Suetonius, The Twelve Caesars, “Life of Julius Caesar” §56 — the classical report of Caesar’s shifted alphabet.',
  },
  'kelly-skytale': {
    label: 'Kelly 1998',
    detail:
      'Thomas Kelly, “The Myth of the Skytale”, Cryptologia 22:3 (1998) — argues the Spartan skytale’s cryptographic use is poorly evidenced.',
  },
  alkadi: {
    label: 'Al-Kadi 1992',
    detail:
      'Ibrahim A. Al-Kadi, “Origins of Cryptology: The Arab Contributions”, Cryptologia 16:2 (1992) — describes al-Kindī’s rediscovered manuscript on deciphering.',
  },
  'tna-babington': {
    label: 'National Archives (UK)',
    detail:
      'Babington Plot correspondence and cipher materials, UK National Archives, State Papers SP 12/193.',
    href: 'https://www.nationalarchives.gov.uk/',
  },
  lasry2023: {
    label: 'Lasry, Biermann & Tomokiyo 2023',
    detail:
      '“Deciphering Mary Stuart’s lost letters from 1578–1584”, Cryptologia 47:2 (2023) — 57 newly decrypted letters found in the Bibliothèque nationale de France.',
    href: 'https://www.tandfonline.com/doi/full/10.1080/01611194.2022.2160677',
  },
  kerckhoffs1883: {
    label: 'Kerckhoffs 1883',
    detail:
      'Auguste Kerckhoffs, “La cryptographie militaire”, Journal des sciences militaires, January–February 1883.',
    href: 'https://www.petitcolas.net/kerckhoffs/',
  },
  beinecke: {
    label: 'Beinecke MS 408',
    detail:
      'Voynich manuscript, Beinecke Rare Book & Manuscript Library, Yale University, MS 408; vellum radiocarbon-dated to the early 15th century (University of Arizona, 2009).',
    href: 'https://collections.library.yale.edu/catalog/2002046',
  },
  'beale-pamphlet': {
    label: 'The Beale Papers 1885',
    detail:
      'The Beale Papers (pamphlet, Lynchburg, Virginia, 1885) — the sole source for the Beale cipher story; treated by Kahn and most analysts as a probable hoax.',
  },
  rejewski1981: {
    label: 'Rejewski 1981',
    detail:
      'Marian Rejewski, “How Polish Mathematicians Deciphered the Enigma”, Annals of the History of Computing 3:3 (1981) — first-person account of the 1932 break.',
  },
  kozaczuk: {
    label: 'Kozaczuk 1984',
    detail:
      'Władysław Kozaczuk, Enigma: How the German Machine Cipher Was Broken, and How It Was Read by the Allies in World War Two. University Publications of America, 1984.',
  },
  hinsley1993: {
    label: 'Hinsley 1993',
    detail:
      'F. H. Hinsley, “The Influence of ULTRA in the Second World War” (1993 lecture; and in Hinsley & Stripp, eds., Codebreakers, Oxford, 1993) — source of the attributed estimate that Ultra shortened the European war by “not less than two years”.',
  },
  welchman1982: {
    label: 'Welchman 1982',
    detail: 'Gordon Welchman, The Hut Six Story. McGraw-Hill, 1982.',
  },
  fagone2017: {
    label: 'Fagone 2017',
    detail:
      'Jason Fagone, The Woman Who Smashed Codes. Dey Street, 2017 — biography of Elizebeth Smith Friedman, from her papers at the George C. Marshall Foundation.',
  },
  friedman1922: {
    label: 'Friedman 1922',
    detail:
      'William F. Friedman, The Index of Coincidence and Its Applications in Cryptography. Riverbank Publication No. 22, 1922.',
  },
  shannon1949: {
    label: 'Shannon 1949',
    detail:
      'Claude E. Shannon, “Communication Theory of Secrecy Systems”, Bell System Technical Journal 28:4 (1949).',
  },
  'vernam-patent': {
    label: 'Vernam patent 1919',
    detail:
      'Gilbert S. Vernam, “Secret Signaling System”, US Patent 1,310,719 (filed 1918, granted 1919).',
  },
  'venona-nsa': {
    label: 'NSA/CIA Venona 1996',
    detail:
      'Robert L. Benson & Michael Warner (eds.), VENONA: Soviet Espionage and the American Response 1939–1957. NSA/CIA, 1996.',
  },
  'haynes-klehr': {
    label: 'Haynes & Klehr 1999',
    detail:
      'John Earl Haynes & Harvey Klehr, Venona: Decoding Soviet Espionage in America. Yale University Press, 1999.',
  },
  ellis1987: {
    label: 'Ellis 1987/1997',
    detail:
      'James H. Ellis, “The History of Non-Secret Encryption” (GCHQ internal paper, 1987; released December 1997).',
  },
  dh1976: {
    label: 'Diffie & Hellman 1976',
    detail:
      'Whitfield Diffie & Martin E. Hellman, “New Directions in Cryptography”, IEEE Transactions on Information Theory 22:6 (November 1976).',
    href: 'https://ieeexplore.ieee.org/document/1055638',
  },
  merkle1978: {
    label: 'Merkle 1978',
    detail:
      'Ralph C. Merkle, “Secure Communications over Insecure Channels”, Communications of the ACM 21:4 (1978) — the “Merkle puzzles”, conceived in 1974.',
  },
  rsa1978: {
    label: 'Rivest, Shamir & Adleman 1978',
    detail:
      '“A Method for Obtaining Digital Signatures and Public-Key Cryptosystems”, Communications of the ACM 21:2 (February 1978).',
  },
  levy2001: {
    label: 'Levy 2001',
    detail:
      'Steven Levy, Crypto: How the Code Rebels Beat the Government — Saving Privacy in the Digital Age. Viking, 2001.',
  },
  fips46: {
    label: 'FIPS 46 (1977)',
    detail:
      'Data Encryption Standard, Federal Information Processing Standards Publication 46, National Bureau of Standards, 15 January 1977.',
  },
  'dh-critique1977': {
    label: 'Diffie & Hellman 1977',
    detail:
      'Whitfield Diffie & Martin Hellman, “Exhaustive Cryptanalysis of the NBS Data Encryption Standard”, Computer 10:6 (1977).',
  },
  coppersmith1994: {
    label: 'Coppersmith 1994',
    detail:
      'Don Coppersmith, “The Data Encryption Standard (DES) and its strength against attacks”, IBM Journal of Research and Development 38:3 (1994) — confirms IBM knew of differential cryptanalysis in 1974.',
  },
  'eff-descrack': {
    label: 'EFF 1998',
    detail:
      'Electronic Frontier Foundation, Cracking DES: Secrets of Encryption Research, Wiretap Politics & Chip Design. O’Reilly, 1998; DES Challenge II (56 hours, July 1998) and III (22 h 15 m with distributed.net, January 1999).',
    href: 'https://www.eff.org/press/archives/2008/04/21-17',
  },
  blaze1994: {
    label: 'Blaze 1994',
    detail:
      'Matt Blaze, “Protocol Failure in the Escrowed Encryption Standard”, ACM CCS 1994 — the LEAF vulnerability in the Clipper system.',
  },
  'zimmermann-essay': {
    label: 'Zimmermann',
    detail: 'Philip Zimmermann, “Why I Wrote PGP” (1991, updated 1999), author’s site.',
    href: 'https://www.philzimmermann.com/EN/essays/WhyIWrotePGP.html',
  },
  'export-relax-2000': {
    label: 'Federal Register 2000',
    detail:
      'Revisions to Encryption Items, 65 FR 2492 (14 January 2000) — the substantial relaxation of US crypto export controls.',
  },
  fips197: {
    label: 'FIPS 197 (2001)',
    detail:
      'Advanced Encryption Standard (AES), FIPS 197, NIST, November 2001 — Rijndael, selected by open international competition, 1997–2000.',
    href: 'https://csrc.nist.gov/pubs/fips/197/final',
  },
  rfc2246: {
    label: 'RFC 2246',
    detail: 'T. Dierks & C. Allen, “The TLS Protocol Version 1.0”, RFC 2246, January 1999.',
    href: 'https://www.rfc-editor.org/rfc/rfc2246',
  },
  rfc8446: {
    label: 'RFC 8446',
    detail:
      'E. Rescorla, “The Transport Layer Security (TLS) Protocol Version 1.3”, RFC 8446, August 2018.',
    href: 'https://www.rfc-editor.org/rfc/rfc8446',
  },
  diginotar: {
    label: 'Fox-IT 2012',
    detail:
      'Fox-IT, “Black Tulip: Report of the investigation into the DigiNotar Certificate Authority breach” (2012).',
  },
  kocher1996: {
    label: 'Kocher 1996',
    detail:
      'Paul C. Kocher, “Timing Attacks on Implementations of Diffie-Hellman, RSA, DSS, and Other Systems”, CRYPTO ’96.',
  },
  kocher1999: {
    label: 'Kocher, Jaffe & Jun 1999',
    detail: '“Differential Power Analysis”, CRYPTO ’99.',
  },
  vaneck1985: {
    label: 'van Eck 1985',
    detail:
      'Wim van Eck, “Electromagnetic Radiation from Video Display Units: An Eavesdropping Risk?”, Computers & Security 4 (1985).',
  },
  spectre2018: {
    label: 'Kocher et al. 2019 / Lipp et al. 2019',
    detail:
      '“Spectre Attacks: Exploiting Speculative Execution” and “Meltdown: Reading Kernel Memory from User Space”, IEEE S&P 2019 (disclosed January 2018).',
  },
  'shumow-ferguson': {
    label: 'Shumow & Ferguson 2007',
    detail:
      'Dan Shumow & Niels Ferguson, “On the Possibility of a Back Door in the NIST SP800-90 Dual Ec Prng”, CRYPTO 2007 rump session.',
  },
  'nyt-dualec': {
    label: 'NYT/ProPublica 2013',
    detail:
      'Nicole Perlroth, Jeff Larson & Scott Shane, “N.S.A. Able to Foil Basic Safeguards of Privacy on Web”, New York Times / ProPublica, 5 September 2013 (from Snowden documents).',
  },
  'reuters-rsa': {
    label: 'Reuters 2013',
    detail:
      'Joseph Menn, “Exclusive: Secret contract tied NSA and security industry pioneer”, Reuters, 20 December 2013 — the reported $10M RSA/BSAFE arrangement; RSA disputed the characterisation.',
  },
  'nist-dualec': {
    label: 'NIST 2014',
    detail:
      'NIST, “NIST Removes Cryptography Algorithm from Random Number Generator Recommendations” (SP 800-90A Rev. 1 process), April 2014.',
    href: 'https://www.nist.gov/news-events/news/2014/04/nist-removes-cryptography-algorithm-random-number-generator-recommendations',
  },
  'aids-trojan': {
    label: 'Virus Bulletin 1990',
    detail:
      'Jim Bates, “Trojan Horse: AIDS Information Introductory Diskette Version 2.0”, Virus Bulletin, January 1990 — analysis of the 1989 AIDS Trojan (Joseph Popp).',
  },
  'young-yung': {
    label: 'Young & Yung 1996',
    detail:
      'Adam Young & Moti Yung, “Cryptovirology: Extortion-Based Security Threats and Countermeasures”, IEEE Security & Privacy 1996 — public-key ransomware described before criminals built it.',
  },
  'wannacry-gov': {
    label: 'NCSC/CISA 2017',
    detail:
      'UK NCSC and US CERT/CISA advisories on WannaCry (May 2017); public attribution to North Korea by the US and UK, December 2017.',
  },
  shor1994: {
    label: 'Shor 1994/1997',
    detail:
      'Peter W. Shor, “Algorithms for Quantum Computation: Discrete Logarithms and Factoring”, FOCS 1994; journal version, SIAM Journal on Computing 26:5 (1997).',
  },
  grover1996: {
    label: 'Grover 1996',
    detail:
      'Lov K. Grover, “A fast quantum mechanical algorithm for database search”, STOC 1996 — quadratic speedup only, so symmetric ciphers survive with larger keys.',
  },
  'cnsa-2': {
    label: 'NSA CNSA 2.0 2022',
    detail:
      'NSA, “Announcing the Commercial National Security Algorithm Suite 2.0” and FAQ (September 2022) — states the harvest-now-decrypt-later rationale for early migration.',
  },
  'nist-pqc': {
    label: 'NIST PQC 2024',
    detail:
      'NIST, FIPS 203 (ML-KEM), FIPS 204 (ML-DSA), FIPS 205 (SLH-DSA), published 13 August 2024, concluding the post-quantum competition begun in 2016.',
    href: 'https://csrc.nist.gov/projects/post-quantum-cryptography',
  },
  'sike-break': {
    label: 'Castryck & Decru 2023',
    detail:
      'Wouter Castryck & Thomas Decru, “An efficient key recovery attack on SIDH”, EUROCRYPT 2023 — the 2022 break of the SIKE candidate on a single laptop.',
  },
  lewand2000: {
    label: 'Lewand 2000',
    detail:
      'Robert E. Lewand, Cryptological Mathematics. Mathematical Association of America, 2000 — reference English letter-frequency tables.',
  },
};
