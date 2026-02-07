# Supit Projekt

Projektni zadatak iz kolegija "Standardi u primjeni internetske tehnologije"

STANDARDI U PRIMJENI INTERNETSKIH TEHNOLOGIJA

Projektna specifikacija

Kreirajte web stranicu koja prezentira Visoko učilište Algebra.

Web stranica ima slijedeće karakteristike:
• (ISHOD UČENJA 1 i 2)
Sadrži uvijek vidljivu izbornu traku sa slijedećim poveznicama:
o Prijava/Odjava
o O nama
o Novosti
o Nastavni plan
o Kontakt

• (ISHOD UČENJA 2)
Koristiti responzivni dizajn kako bi se web stranica ispravno prikazala na desktop i
mobilnim uređajima.

• (ISHOD UČENJA 1)
Parametri kontakt obrasca se šalju na adresu:
https://www.fulek.com/mvc/supit/project-contact-form
Nazivi parametara kontakt obrasca:
o FullName
o Email
o Importance
o ReceiveNewsletter
o Message

• (ISHOD UČENJA 3)
Poglavlje Nastavni plan vide samo prijavljeni korisnici.
• Pristupne točke:
o Prijava (POST)
https://www.fulek.com/data/api/user/login
Podaci potrebni za prijavu su username i password.
o Registracija (POST)
https://www.fulek.com/data/api/user/register
Podaci potrebni za registraciju su username i password.
• Zaštićene pristupne točke koje isporučuju podatke o kolegijima zahtjevaju JWT token
koji se klijentu isporučuje nakon uspješne prijave
o Svi kolegiji (GET):
https://www.fulek.com/data/api/supit/curriculumlist/hr
o Pojedini kolegij (GET) (npr. kolegij čiji id je 5):
https://www.fulek.com/data/api/supit/get-curriculum/5
• Kolegiji se pretražuju putem autocomplete polja
• Odabirom kolegija prikazuju se detalji kolegija
• Odabrani kolegiji se mogu uklanjati iz tablice pri čemu se ažuriraju ukupne vrijednosti
Na temelju zahtjeva procijeniti opravdanost korištenja JavaScript programskih okvira te u
slučaju opravdanosti implementirajte rješenje.
Za postizanje maksimalnog broja bodova dizajn treba pokrivati sve prikazane elemente:
• Atraktivan dizajn
• Pozadinske video animacije
• Prikaz slika putem galerije slika (lightbox, fancybox…) (ISHOD UČENJA 4)
• Animacije poglavlja u trenutku prikazivanja
• Korištenje modalnih dijaloških okvira (vlastitih ili vanjskih (jQueryUI, Bootstrap i sl.))

(ISHOD UČENJA 4)
Na temelju zahtjeva procijeniti opravdanost korištenja elemenata jQuery, jQueryUI i
Bootstrap biblioteka te u slučaju opravdanosti implementirajte rješenje.
Studenti mogu izraditi identičnu web stranicu kao u prikazanom predlošku ili napraviti vlastiti
dizajn te implementirati sve prikazane elemente.
Uz projektnu specifikaciju priloženi su materijali za izradu projekta (tekst, slike, video…)
Za izradu projekta ne smiju se koristiti biblioteke tipa Vue, React, Angular i sl.
Snimljeni predložak gotovog projekta možete pogledati ovdje:
https://tinyurl.com/SUPIT2022

NAČIN PREDAJE PROJEKTA
Student mora 2 dana prije ispitnog roka poslati arhiviran projekt na e-mail adresu
predavača (redovni studenti) ili asistenta (izvanredni studenti) u obliku ImePrezime.zip
(npr. ako je ispitni rok 15.02. projektni zadatak se mora poslati najkasnije do 12.02 –
23h:59min:59sec)
Studenti koji ne pošalju gotov projektni zadatak u zadanom roku ne mogu pristupiti obrani
projekta.
Do termina obrane projekt se smije dodatno uređivati.
DISTRIBUCIJA BODOVA
Ishod učenja 1
Minimalni ishod – kreirati html strukturu dokumenta koristeći generičke elemente za
grupiranje – 15 bodova.
Željeni ishod – kreirati html strukturu dokumenta koristeći semantičke html elemente uz
upotrebu id i class atributa za dodatno pojašnjenje strukture - 10 bodova.
Ishod učenja 2
Minimalni ishod – vizualno prilagoditi sučelje web stranice prema tehničkoj specifikaciji –
15 bodova
Željeni ishod – napraviti raspodjelu elemenata stranice putem CSS-a, primijeniti CSS
tranzicije i transformacije u svrhu obogaćivanja ukupnog vizualnog dojma te primijeniti CSS
upite radi responzivnosti sučelja na različitim rezolucijama – 10 bodova.
Napomena: ukoliko student responzivnost riješi korištenjem vanjskih JavaScript biblioteka
(ishod učenja 4 - bootstrap grid) može dobiti maksimalne bodove željenog ishoda učenja 2.
Ishod učenja 3
Minimalni ishod – dohvatiti i prikazati podatke sa poslužiteljske skripte upotrebom
JavaScript-a – 15 bodova.
Željeni ishod – dohvatiti i prikazati podatke prema zadanoj specifikaciji upotrebom vanjskih
JavaScript biblioteka – 10 bodova.
Ishod učenja 4
Minimalni ishod – definirati izgled elemenata web stranice korištenjem vanjskih JavaScript i
CSS biblioteka – 15 bodova.
Željeni ishod – definirati izgled, funkcionalnost i responzivnost web stranice korištenjem
vanjskih JavaScript i CSS biblioteka – 10 bodova.
Napomena: ukoliko student responzivnost riješi korištenjem vlastitih CSS upita(ishod učenja 2) može dobiti maksimalan broj bodova.
