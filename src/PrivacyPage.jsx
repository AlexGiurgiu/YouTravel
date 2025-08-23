import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function PrivacyPage() {
  const { pathname } = useLocation();
  const isEN = !pathname.startsWith("/ro");

  return (
    <div className="min-h-screen bg-white">
      {/* Header: logo-only, clickable */}
      <header className="fixed top-0 left-0 w-full z-50 bg-white border-b border-neutral-200">
        <div className="max-w-6xl mx-auto flex items-center justify-between py-3 px-4">
          <Link to={isEN ? "/" : "/ro"} className="flex items-center" aria-label="YouTravel">
            <img
              src={`${import.meta.env.BASE_URL}images/logo-youtravel-blue.png`}
              alt="YouTravel"
              className="h-12 w-auto"
            />
          </Link>
          <Link to={isEN ? "/" : "/ro"} className="text-sm text-gray-700 hover:text-[#E76F51]">
            {isEN ? "Back to Home" : "Înapoi la început"}
          </Link>
        </div>
      </header>

      <main className="pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-6 text-gray-800 leading-relaxed text-justify">
          {isEN ? <EnglishPolicy /> : <RomanianPolicy />}
        </div>
      </main>
    </div>
  );
}

/* ---------------- EN ---------------- */
function EnglishPolicy() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

      <p className="mb-4">
        We aim to provide travel services while complying with data-protection legislation at the highest professional standards and
        implementing high standards of confidentiality and transparency regarding the personal data we process in our daily activity. Our
        core values are full protection and transparency regarding the processing of your personal data within our services.
      </p>
      <p className="mb-4">
        This Privacy Policy describes the categories of personal data we process, how and for what purposes we collect them, situations in
        which we transfer personal data, and the rights and options you have. It also details how we process personal data to manage client
        relationships, most often to keep you up to date with the latest offers.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">Controller</h2>
      <p className="mb-4">
        <strong>YOUR TRAVEL SOLUTIONS SRL</strong>, Bucharest, Bd Mircea Veroiu, nr 44, sector 1, Phone: +40720377378,
        Email: office@youtravel.ro, hereinafter “YOU TRAVEL”.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">Categories of Personal Data Processed</h2>
      <ul className="list-disc list-inside space-y-2 mb-4">
        <li>Contact information: name, postal address (including domicile if provided), business address, phone/mobile/fax, email, ID document details.</li>
        <li>Additional information in a contractual context or voluntarily communicated by you (instructions, payments, booking info or access to YOU TRAVEL offers).</li>
        <li>Special categories where necessary for services (e.g., trade-union membership, health data).</li>
        <li>Details of your visits to our offices or other details regarding your interactions with us.</li>
        <li>Browsing data collected through cookies and similar technologies (per Cookies Policy): access date/time, browser/software, OS language, screen resolution, location, pages viewed, time spent on site/pages.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-3">Legal Grounds</h2>
      <ul className="list-disc list-inside space-y-2 mb-4">
        <li>Processing necessary for concluding or performing a contract with you.</li>
        <li>Compliance with a legal obligation.</li>
        <li>Your consent.</li>
        <li>Protection of vital interests of you or another natural person.</li>
        <li>Legitimate interests of YOU TRAVEL or a third party (unless overridden by your fundamental rights and freedoms).</li>
        <li>For special categories, processing will occur if, in addition to a general legal ground, explicit consent is obtained.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-3">Purposes of Processing</h2>
      <ul className="list-disc list-inside space-y-2 mb-4">
        <li>Provision of travel or related services.</li>
        <li>Management and administration of our contractual relationship with clients.</li>
        <li>Compliance with legal obligations (e.g., reporting to tax authorities).</li>
        <li>Security and access management for our premises and IT systems (website, data-management platforms, communications), including preventing and detecting security threats, fraud, or unauthorized/malicious activity.</li>
        <li>Compliance with court decisions; exercising/defending our rights and interests.</li>
        <li>Marketing activities (personalized newsletters with your consent; you can unsubscribe at any time).</li>
        <li>Analysing and improving our services and communications, including customer satisfaction surveys.</li>
        <li>Any purpose related and/or auxiliary to the above, or for any other purpose for which your personal data were provided, in accordance with applicable law.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-3">Disclosure of Your Data</h2>
      <p className="mb-4">
        We may disclose your personal data to other travel service providers we collaborate with for delivering the services, as well as to public
        authorities, entities indicated by you (which may be our client or a third party involved), or other entities in the context of providing
        YOU TRAVEL services (such as insurers). We will ensure that these recipients comply with legal requirements for processing personal data.
        We may use processors (e.g., IT solutions for business management, accounting solutions, or online tools for administering the website)
        under data-processing agreements with appropriate clauses. YOU TRAVEL will not provide (sell or rent) your personal data to third parties.
        We may disclose data to law-enforcement authorities where provided by law or strictly necessary to prevent, detect, or prosecute crimes and
        fraud, or if otherwise legally required. We may also need to disclose data to competent authorities to protect and defend our rights or
        property or those of our business partners.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">International Transfers</h2>
      <p className="mb-4">
        We may transfer your personal data to EEA states or to countries recognized by the European Commission as ensuring an adequate level of
        protection, if necessary for the permitted purposes described above. In exceptional situations, if necessary to provide YOU TRAVEL services,
        we may transfer your personal data to third countries without an adequacy decision. We will ensure such international transfers are subject to
        appropriate safeguards (e.g., Standard Contractual Clauses approved by the European Commission) as required by GDPR or other applicable legal
        provisions. You may contact us for details.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">Updating Your Personal Data</h2>
      <p className="mb-4">
        If any of your personal data change (e.g., first/last name or email address) or you wish to cancel any request addressed to us, or you learn that we hold any inaccurate personal data about you, please contact us by email at: <a href="mailto:office@youtravel.ro" className="text-[#1D3557]">office@youtravel.ro</a>. We will not be liable for any loss resulting from inaccurate, unauthentic, insufficient, or incomplete personal data you provide.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">Retention</h2>
      <p className="mb-4">
        YOU TRAVEL has implemented technical and organizational measures for structuring the process and specific criteria for processing your personal data (including according to our archiving procedures). We will cease processing when the data are no longer reasonably necessary for the permitted purposes, or when you withdraw consent (where applicable) and no legitimate and compelling grounds remain that justify further processing by YOU TRAVEL (including a legal obligation to continue storing the data) that prevail over your interests, rights, and freedoms, or when the data are no longer necessary for the establishment, exercise, or defense of legal claims.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">Your Rights</h2>
      <ul className="list-disc list-inside space-y-2 mb-4">
        <li>Right to request a copy of your personal data that we hold.</li>
        <li>Right to rectification of any inaccurate or incomplete personal data.</li>
        <li>Right to object to or restrict our use of your personal data.</li>
        <li>Right to withdraw consent for consent-based processing (without affecting the lawfulness of processing prior to withdrawal).</li>
        <li>Right to erasure where applicable (e.g., consent withdrawn, processing no longer necessary, processing unlawful).</li>
        <li>Right to data portability (to request transmission of your personal data to another entity/controller indicated by you).</li>
      </ul>
      <p className="mb-4">
        If we discover any breach of personal-data processing that presents a risk to your rights and freedoms, we will inform the Romanian Supervisory Authority (ANSPDCP).
        If the breach could affect your rights and freedoms in any way, you will be informed without undue delay.
      </p>
      <p className="mb-4">
        To exercise your rights, please contact us: Bd Mircea Veroiu, nr 44, sector 1, Bucharest, Romania · Email:
        <a href="mailto:office@youtravel.ro" className="text-[#1D3557]"> office@youtravel.ro</a> · Phone: +40720377378. To comply with our legal obligations
        for data security and confidentiality, when you exercise your rights as a data subject we may ask you to prove your identity by providing a copy of an identification document or other information necessary to verify the request comes from the relevant data subject.
      </p>
      <p className="mb-4">
        We will consider any requests or complaints and respond within legal deadlines. If you are not satisfied with our response or believe processing is unlawful, you may lodge a complaint with the Romanian supervisory authority (ANSPDCP): Address: B-dul G-ral. Gheorghe Magheru 28-30, 010336 Bucharest · Phone: +40 318 059 211 / 212 · Email: anspdcp@dataprotection.ro · Website: www.dataprotection.ro.
      </p>
    </div>
  );
}

/* ---------------- RO ---------------- */
function RomanianPolicy() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Politica de Confidențialitate</h1>

      <p className="mb-4">
        Dorim să oferim servicii turistice dar și să respectăm legislația din domeniul protecției datelor la cele mai înalte standarde profesionale, dar și să
        implementăm cele mai înalte standarde de confidențialitate și transparență cu privire la datele cu caracter personal pe care le prelucrăm în activitatea
        noastră curentă. Valorile noastre fundamentale sunt definite de protecția și transparență totală în ceea ce privește prelucrarea datelor dumneavoastră cu
        caracter personal în cadrul prestării serviciilor noastre.
      </p>
      <p className="mb-4">
        Politica de Prelucrare a Datelor cu Caracter Personal descrie categoriile datelor dumneavoastră cu caracter personal pe care le prelucrăm, modalitățile și
        scopurile în care le colectăm, în ce situații transferăm date cu caracter personal, precum și drepturile și opțiunile de care dispuneți în acest sens. În
        același timp, Politica de Prelucrare a Datelor cu Caracter Personal detaliază modul în care prelucrăm datele cu caracter personal în gestionarea relației cu
        clienții, cel mai adesea pentru a vă ține la curent cu cele mai recente oferte.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">Operatorul datelor</h2>
      <p className="mb-4">
        Operatorul în relația cu datele dvs. cu caracter personal este Societatea <strong>YOUR TRAVEL SOLUTIONS SRL</strong>, cu sediul în București,
        Bd Mircea Veroiu, nr 44, sector 1, tel. +40720377378, e-mail office@youtravel.ro, denumită generic YOU TRAVEL.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">Categorii de date cu caracter personal prelucrate</h2>
      <ul className="list-disc list-inside space-y-2 mb-4">
        <li>Informații de contact, cum ar fi numele, adresa poștală (inclusiv domiciliu, dacă a fost comunicată), adresa profesională, numărul de telefon, telefon mobil, fax, e-mail, date din documente de identitate;</li>
        <li>Informații suplimentare prelucrate în context contractual sau comunicate voluntar (instrucțiuni acordate, plăți efectuate, orice alte informații privind rezervări sau accesarea unor oferte ale YOU TRAVEL);</li>
        <li>În contextul serviciilor prestate putem colecta și prelucra categorii speciale de date (ex.: apartenență la sindicat, date de sănătate);</li>
        <li>Detalii ale vizitelor la birourile noastre sau alte detalii privind modul în care interacționați cu noi;</li>
        <li>Date din navigarea pe site colectate prin cookie-uri și tehnologii similare (conform Politicii cookies): data/ora accesării, software/browser, sistemul de operare și limba, rezoluția ecranului, locația, istoricul accesărilor și timpul petrecut.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-3">Temeiuri juridice</h2>
      <ul className="list-disc list-inside space-y-2 mb-4">
        <li>Prelucrarea este necesară pentru încheierea sau executarea unui contract la care sunteți parte;</li>
        <li>Respectarea unei obligații legale a operatorului;</li>
        <li>Prelucrarea în temeiul consimțământului dvs.;</li>
        <li>Prelucrarea este necesară pentru protejarea intereselor vitale ale dvs. sau ale altei persoane fizice;</li>
        <li>Interesul legitim al YOU TRAVEL sau al unui terț, cu excepția cazurilor în care interesele sau drepturile și libertățile dvs. prevalează;</li>
        <li>În cazul categoriilor speciale de date: consimțământ explicit, pe lângă un temei general.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-3">Scopurile prelucrării</h2>
      <ul className="list-disc list-inside space-y-2 mb-4">
        <li>Oferirea de servicii turistice sau asociate acestora;</li>
        <li>Gestionarea și administrarea relației contractuale cu clienții;</li>
        <li>Respectarea obligațiilor legale (ex.: raportări către autorități fiscale);</li>
        <li>Gestionarea securității și accesului la sediu și sisteme IT (site, platforme de management a datelor, sisteme de comunicații), inclusiv prevenirea/detectarea amenințărilor de securitate, a fraudelor sau altor activități neautorizate sau malițioase;</li>
        <li>Respectarea hotărârilor judecătorești și exercitarea/apărarea drepturilor și intereselor noastre;</li>
        <li>Activități de marketing (newslettere personalizate cu acceptul dvs.; dezabonare oricând prin butonul Unsubscribe);</li>
        <li>Analizarea și îmbunătățirea serviciilor și comunicărilor, inclusiv sondaje privind satisfacția clienților;</li>
        <li>Orice scop aferent și/sau auxiliar celor de mai sus ori orice alt scop pentru care datele au fost furnizate, cu respectarea legislației aplicabile.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-3">Dezvăluirea datelor</h2>
      <p className="mb-4">
        Putem dezvălui datele cu caracter personal către alți prestatori de servicii turistice cu care colaborăm pentru furnizarea serviciilor, către autorități publice,
        entități indicate de dvs. (care poate fi clientul nostru sau o terță parte implicată) sau alte entități în contextul furnizării serviciilor YOU TRAVEL (cum ar fi:
        furnizori de servicii de asigurare etc.). Ne vom asigura că destinatarii acestor date respectă cerințele legale. Putem utiliza persoane împuternicite (furnizori de
        soluții IT, contabilitate, soft-uri online) pe baza unor acorduri de prelucrare a datelor personale, care includ clauze specifice. YOU TRAVEL nu va furniza (prin
        vânzare sau închiriere) către terți datele dvs. Este posibil să divulgăm date autorităților care aplică legea, în măsura prevăzută de lege sau strict necesar pentru
        prevenirea/detectarea/urmărirea penală a infracțiunilor și fraudelor sau dacă suntem altfel obligați prin lege; putem divulga și către autorități competente pentru
        protejarea și apărarea drepturilor sau bunurilor noastre ori ale partenerilor.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">Transferul datelor în străinătate</h2>
      <p className="mb-4">
        Putem transfera datele în state din Spațiul Economic European sau în state recunoscute de Comisia Europeană ca asigurând un nivel adecvat de protecție, dacă acest
        transfer este necesar pentru scopurile permise. În situații excepționale, dacă este necesar pentru serviciile YOU TRAVEL, putem transfera date în state terțe fără
        decizie de adecvare, asigurând măsuri de protecție adecvate (ex.: Clauze Contractuale Standard) conform GDPR sau altor dispoziții legale aplicabile. Ne puteți
        contacta pentru informații suplimentare privind aceste măsuri.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">Actualizarea datelor</h2>
      <p className="mb-4">
        Dacă datele furnizate se modifică (ex.: prenume/nume sau e-mail) sau doriți să anulați o solicitare ori aflați că deținem date incorecte despre dvs., vă rugăm să ne
        contactați la: <a href="mailto:office@youtravel.ro" className="text-[#1D3557]">office@youtravel.ro</a>. Nu vom fi răspunzători pentru nicio pierdere rezultată din
        date incorecte/neautentice/insuficiente/incomplete furnizate de dvs.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">Durata de stocare</h2>
      <p className="mb-4">
        YOU TRAVEL a implementat măsuri tehnice și organizatorice pentru organizarea procesului și criterii specifice pentru prelucrarea datelor personale (inclusiv conform
        procedurilor noastre de arhivare). Vom înceta prelucrarea datelor atunci când acestea nu mai sunt necesare rezonabil pentru scopurile permise sau când vă retrageți
        consimțământul (dacă este cazul) și nu mai există motive legitime care să justifice prelucrarea în continuare (inclusiv obligația legală a YOU TRAVEL de a continua
        stocarea), ori când datele nu mai sunt necesare pentru constatarea, exercitarea sau apărarea unui drept în instanță.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">Drepturile dvs.</h2>
      <ul className="list-disc list-inside space-y-2 mb-4">
        <li>Dreptul de a solicita o copie a datelor personale pe care le deținem;</li>
        <li>Dreptul la rectificarea datelor incorecte sau incomplete;</li>
        <li>Dreptul la opoziție sau restricționarea prelucrării;</li>
        <li>Dreptul de a vă retrage consimțământul pentru prelucrările efectuate pe bază de consimțământ;</li>
        <li>Dreptul la ștergerea datelor, în cazurile prevăzute de lege (ex.: consimțământ retras, prelucrare nelegală etc.);</li>
        <li>Dreptul la portabilitatea datelor (transmiterea datelor către un alt operator indicat de dvs.).</li>
      </ul>
      <p className="mb-4">
        Dacă identificăm o încălcare a securității datelor personale care prezintă un risc pentru drepturile și libertățile dvs., vom informa Autoritatea Națională de
        Supraveghere a Prelucrării Datelor cu Caracter Personal. Dacă încălcarea v-ar putea afecta, vă vom informa fără întârziere nejustificată.
      </p>
      <p className="mb-4">
        Pentru exercitarea drepturilor: Bd Mircea Veroiu, nr 44, sector 1, București, România · E-mail: office@youtravel.ro · Telefon: +40720377378. Pentru securitate,
        vă putem solicita dovada identității.
      </p>
      <p className="mb-4">
        Dacă nu sunteți mulțumit de răspunsul nostru sau considerați că prelucrarea este contrară legii, puteți depune plângere la ANSPDCP:
        B-dul G-ral. Gheorghe Magheru 28-30, 010336 București, România · Telefon: +40 318 059 211 / 212 · E-mail: anspdcp@dataprotection.ro · Website: www.dataprotection.ro.
      </p>
    </div>
  );
}