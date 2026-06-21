# Analiza prawna plików cookie i przechowywania danych

**Serwis:** <https://gustawbeznicki.dev> — prywatne CV (strona-wizytówka).
**Administrator:** Gustaw Beźnicki, Gdańsk.
**Charakter serwisu:** statyczna strona informacyjna; brak kont użytkowników, brak formularzy,
brak sklepu, brak logowania.
**Odbiorca dokumentu:** radca prawny / adwokat. Wersja techniczna:
[cookies-technical.md](./cookies-technical.md).
**Stan na:** czerwiec 2026 (po usunięciu widżetu LinkedIn).

> Niniejszy dokument opisuje stan faktyczny i jego ocenę w świetle obowiązujących przepisów.
> Nie stanowi opinii prawnej — ma posłużyć prawnikowi jako rzetelny opis techniczny do oceny
> i ewentualnego sporządzenia dokumentów (polityka prywatności / cookies).

## 1. Podsumowanie (stan po zmianach)

- Serwis **nie zapisuje żadnych plików cookie** (ani własnych, ani podmiotów trzecich).
- Serwis **nie korzysta z analityki, pikseli śledzących ani profilowania**.
- Jedyny element przechowywany w przeglądarce to **zapis zgody** wygenerowany przez baner
  zgód, umieszczany w `localStorage` (nie w cookie) — jest to dana **ściśle niezbędna**,
  zwolniona z obowiązku uzyskania zgody.
- Wcześniej obecny **widżet profilowy LinkedIn** (jedyny element mogący zapisywać cookie
  podmiotu trzeciego przed wyrażeniem zgody) został **usunięty**.
- Czcionki są hostowane lokalnie (brak połączeń z Google Fonts), więc **adres IP użytkownika
  nie jest przekazywany do Google** przy renderowaniu strony.

**Wniosek wstępny:** w obecnym stanie serwis nie ustawia cookies wymagających zgody w rozumieniu
art. 173 Prawa telekomunikacyjnego, a jedyne przechowywanie danych po stronie klienta mieści się
w wyjątku „ściśle niezbędnym".

## 2. Podstawy prawne (mające zastosowanie)

- **RODO** — rozporządzenie (UE) 2016/679 (ochrona danych osobowych).
- **Ustawa Prawo telekomunikacyjne, art. 173** (implementacja dyrektywy ePrivacy 2002/58/WE) —
  reguluje przechowywanie/odczyt informacji w urządzeniu końcowym (cookies i podobne); wymaga
  **uprzedniej zgody** użytkownika z wyjątkiem przechowywania **niezbędnego** do świadczenia
  usługi żądanej przez użytkownika.
- Organ nadzorczy: **UODO** (Prezes Urzędu Ochrony Danych Osobowych).

## 3. Inwentaryzacja przechowywania danych w przeglądarce

| Mechanizm | Występuje? | Kategoria | Wymaga zgody? |
| --------- | ---------- | --------- | ------------- |
| Cookies własne | Nie | — | — |
| Cookies podmiotów trzecich | Nie | — | — |
| `localStorage` — zapis zgody (baner) | Tak | Ściśle niezbędne | **Nie** (wyjątek) |
| Inne `localStorage` / `sessionStorage` | Nie | — | — |
| Analityka / piksele / profilowanie | Nie | — | — |
| Formularze, przesyłanie danych | Nie | — | — |

Zapis zgody nie zawiera identyfikatora pozwalającego śledzić użytkownika między serwisami;
przechowuje wyłącznie informację o dokonanym przez użytkownika wyborze i służy temu, by nie
wyświetlać banera ponownie.

## 4. Przetwarzanie po stronie serwera (Cloudflare)

Strona jest serwowana przez **Cloudflare Worker**. Cloudflare, działając jako **podmiot
przetwarzający** (procesor) i dostawca infrastruktury/CDN, w ramach standardowej obsługi żądań
HTTP oraz funkcji bezpieczeństwa przetwarza m.in.:

- **adres IP** użytkownika oraz metadane żądania (nagłówki, ścieżka, znacznik czasu) — w celu
  dostarczenia treści, zapewnienia bezpieczeństwa i statystyk technicznych po stronie serwera
  („observability").

To przetwarzanie:

- jest **niezbędne** do dostarczenia żądanej strony (podstawa: prawnie uzasadniony interes /
  niezbędność techniczna),
- **nie wykorzystuje cookies** ani nie zapisuje danych w urządzeniu użytkownika,
- nie służy profilowaniu ani marketingowi.

Zalecenie: w polityce prywatności wskazać Cloudflare jako dostawcę hostingu/CDN przetwarzającego
adres IP oraz odnotować ewentualny transfer danych poza EOG (Cloudflare — standardowe klauzule
umowne / mechanizmy zgodności). Warto rozważyć zawarcie/utrzymanie umowy powierzenia (DPA).

## 5. Łącza wychodzące do podmiotów trzecich

Strona zawiera zwykłe odnośniki (`<a href>`) m.in. do LinkedIn, GitHub oraz stron byłych/obecnych
pracodawców i własnych przedsięwzięć. **Kliknięcie** takiego odnośnika przenosi użytkownika do
serwisu zewnętrznego, który może stosować własne cookies — ale dopiero **po opuszczeniu** naszej
strony i wyłącznie na zasadach tego serwisu. Sama nasza strona nie osadza tych treści ani nie
pobiera z nich danych. Odnośniki nie wymagają zgody cookie po naszej stronie.

## 6. Baner zgód (mechanizm prewencyjny)

Wdrożono otwartoźródłowy (licencja MIT) baner **Silktide Consent Manager**, hostowany lokalnie
na naszym serwerze (bez CDN podmiotów trzecich). Baner:

- przechowuje wyłącznie zapis zgody w `localStorage` (brak cookie),
- nie wykonuje żadnych połączeń sieciowych do podmiotów zewnętrznych,
- udostępnia kategorie zgód: **Niezbędne** (zawsze aktywne) oraz **Analityka** (domyślnie
  **wyłączona**, brak aktywnych skryptów).

Ponieważ obecnie serwis nie ustawia cookies wymagających zgody, baner pełni rolę **prewencyjną
i porządkową**: gdyby w przyszłości dodano np. narzędzie analityczne, zostanie ono załadowane
**dopiero po wyrażeniu zgody** (privacy by design / by default, art. 25 RODO). Konstrukcja
realizuje model „opt-in": brak działania = brak zgody na kategorie nieobowiązkowe.

## 7. Ocena zgodności i rekomendacje

**Ocena:** W obecnym stanie faktycznym serwis nie wymaga zgody na cookies w rozumieniu art. 173
Prawa telekomunikacyjnego (brak cookies; jedyny zapis w `localStorage` jest ściśle niezbędny).
Obowiązek informacyjny RODO (art. 13) pozostaje aktualny w zakresie przetwarzania adresu IP przez
hosting/CDN.

**Rekomendacje:**

1. **Polityka prywatności** — krótki dokument informujący o: administratorze i danych
   kontaktowych; przetwarzaniu adresu IP przez Cloudflare (hosting/CDN) i celu; lokalnym zapisie
   zgody w `localStorage`; braku cookies, analityki i profilowania; prawach osób (dostęp,
   sprostowanie, usunięcie itd.) oraz prawie skargi do UODO; ewentualnym transferze poza EOG.
2. **Polityka cookies** — może być sekcją powyższego dokumentu; treść: „serwis nie stosuje
   plików cookie; przechowywany jest wyłącznie lokalny zapis zgody niezbędny do działania
   banera".
3. **Aktualizacja przy zmianach** — jeśli kiedykolwiek dodane zostanie narzędzie analityczne lub
   inny skrypt podmiotu trzeciego, przed wdrożeniem należy: (a) podpiąć je pod kategorię zgody
   w banerze (ładowanie wyłącznie po opt-in), (b) zaktualizować politykę prywatności/cookies,
   (c) zweryfikować podstawę prawną i ewentualny transfer danych.
4. **Umowa powierzenia (DPA)** — potwierdzić obowiązującą umowę powierzenia z Cloudflare.

## 8. Słowniczek

- **Cookie** — niewielki plik zapisywany przez stronę w przeglądarce; może służyć m.in.
  śledzeniu. **W tym serwisie nieużywany.**
- **`localStorage`** — lokalny magazyn przeglądarki; tutaj przechowuje wyłącznie zapis zgody.
- **Procesor (podmiot przetwarzający)** — podmiot przetwarzający dane na zlecenie administratora;
  tu: Cloudflare (hosting/CDN).
- **Opt-in** — model, w którym kategorie nieobowiązkowe są domyślnie wyłączone do czasu zgody.
