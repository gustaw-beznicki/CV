# Analiza prawna plików cookie i przechowywania danych

**Serwis:** <https://gustawbeznicki.dev> — prywatne CV (strona-wizytówka).
**Administrator:** Gustaw Beźnicki, Gdańsk.
**Charakter serwisu:** statyczna strona informacyjna; brak kont użytkowników, brak formularzy,
brak sklepu, brak logowania.
**Odbiorca dokumentu:** radca prawny / adwokat. Wersja techniczna:
[cookies-technical.md](./cookies-technical.md).
**Stan na:** czerwiec 2026 (po usunięciu widżetu LinkedIn i wdrożeniu bezciasteczkowej analityki
Umami, uruchamianej za zgodą). Szczegóły wdrożenia: [umami-deployment.md](./umami-deployment.md).

> Niniejszy dokument opisuje stan faktyczny i jego ocenę w świetle obowiązujących przepisów.
> Nie stanowi opinii prawnej — ma posłużyć prawnikowi jako rzetelny opis techniczny do oceny
> i ewentualnego sporządzenia dokumentów (polityka prywatności / cookies).

## 1. Podsumowanie (stan po zmianach)

- Serwis **nie zapisuje żadnych plików cookie** (ani własnych, ani podmiotów trzecich).
- Serwis korzysta z **analityki Umami** — bezciasteczkowej, samodzielnie hostowanej (Raspberry Pi
  za Cloudflare Tunnel), wczytywanej **wyłącznie po wyrażeniu zgody** (opt-in, domyślnie wyłączona)
  i serwowanej w ramach własnej domeny (first-party). Brak profilowania, pikseli i marketingu.
- Jedyny element przechowywany w przeglądarce na stałe to **zapis zgody** wygenerowany przez baner,
  umieszczany w `localStorage` (nie w cookie) — dana **ściśle niezbędna**, zwolniona z obowiązku
  zgody. Umami **nie zapisuje cookies** ani danych osobowych; korzysta z `localStorage` jedynie dla
  własnej flagi rezygnacji (`umami.disabled`).
- Wcześniej obecny **widżet profilowy LinkedIn** (jedyny element mogący zapisywać cookie
  podmiotu trzeciego przed wyrażeniem zgody) został **usunięty**.
- Czcionki są hostowane lokalnie (brak połączeń z Google Fonts), więc **adres IP użytkownika
  nie jest przekazywany do Google** przy renderowaniu strony.

**Wniosek wstępny:** serwis **nie ustawia plików cookie**. Analityka Umami jest bezciasteczkowa,
więc art. 173 Prawa telekomunikacyjnego (zgoda na przechowywanie/odczyt informacji w urządzeniu)
co do zasady jej nie obejmuje — mimo to uruchamiana jest dopiero po zgodzie (rozwiązanie
ostrożnościowe, „privacy by default"). Pozostaje obowiązek informacyjny RODO co do przetwarzania
adresu IP (Cloudflare oraz instancja Umami administratora).

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
| `localStorage` — flaga `umami.disabled` | Tylko po rezygnacji | Ściśle niezbędne (rezygnacja) | **Nie** |
| Analityka Umami (bezciasteczkowa) | Tak, **po zgodzie** | Statystyka/analityka | Bezciasteczkowa → poza art. 173; mimo to za zgodą |
| Piksele / profilowanie / marketing | Nie | — | — |
| Formularze, przesyłanie danych | Nie (poza wysyłką zdarzeń Umami po zgodzie) | — | — |

Zapis zgody nie zawiera identyfikatora pozwalającego śledzić użytkownika między serwisami;
przechowuje wyłącznie informację o dokonanym przez użytkownika wyborze i służy temu, by nie
wyświetlać banera ponownie. Umami nie ustawia cookies i nie zapisuje danych osobowych w urządzeniu.

## 3a. Analityka Umami — charakterystyka

- **Bezciasteczkowa i anonimowa.** Umami nie ustawia plików cookie ani nie tworzy trwałego
  identyfikatora w urządzeniu; zlicza odsłony i podstawowe metadane (strona, kraj, typ
  przeglądarki/urządzenia, źródło wejścia).
- **Samodzielny hosting.** Instancja Umami działa na sprzęcie administratora (Raspberry Pi),
  udostępniona przez Cloudflare Tunnel — dane analityczne **nie trafiają do zewnętrznego dostawcy
  analityki** (brak Google Analytics itp.).
- **First-party.** Skrypt i zbieranie zdarzeń są serwowane z domeny serwisu (proxy `/_a/`), więc
  z perspektywy przeglądarki nie zachodzi przekazanie do podmiotu trzeciego.
- **Adres IP.** Umami wykorzystuje IP + User-Agent **wyłącznie przejściowo** do rozpoznania
  unikalnych odwiedzin (skrót/hash), bez trwałego przechowywania IP — to przetwarzanie danych
  osobowych objęte obowiązkiem informacyjnym RODO.
- **Podstawa prawna.** Wczytanie następuje po **zgodzie** (art. 6 ust. 1 lit. a RODO); zgoda jest
  dobrowolna, odwoływalna w każdej chwili przez baner (kategoria „Analityka").

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

## 6. Baner zgód i sterowanie analityką

Wdrożono otwartoźródłowy (licencja MIT) baner **Silktide Consent Manager**, hostowany lokalnie
na naszym serwerze (bez CDN podmiotów trzecich). Baner:

- przechowuje wyłącznie zapis zgody w `localStorage` (brak cookie),
- nie wykonuje żadnych połączeń sieciowych do podmiotów zewnętrznych,
- udostępnia kategorie zgód: **Niezbędne** (zawsze aktywne) oraz **Analityka** (domyślnie
  **wyłączona**).

Kategoria **Analityka** steruje wczytaniem Umami: skrypt analityczny jest dodawany do strony
**dopiero po wyrażeniu zgody** (opt-in), a po jej cofnięciu — usuwany, z ustawieniem flagi
rezygnacji. Realizuje to model „privacy by default" (art. 25 RODO): brak działania = brak zgody na
kategorie nieobowiązkowe. Zgodę można w każdej chwili odwołać.

## 7. Ocena zgodności i rekomendacje

**Ocena:** Serwis **nie stosuje plików cookie**. Analityka Umami jest bezciasteczkowa (co do zasady
poza zakresem art. 173 Prawa telekomunikacyjnego), a mimo to uruchamiana wyłącznie po zgodzie —
rozwiązanie ostrożnościowe, korzystne dla użytkownika. Aktualny pozostaje **obowiązek informacyjny
RODO (art. 13)** w zakresie przetwarzania adresu IP przez: (a) Cloudflare (hosting/CDN/tunel) oraz
(b) instancję Umami administratora (Raspberry Pi).

**Rekomendacje:**

1. **Polityka prywatności** — dokument informujący o: administratorze i danych kontaktowych;
   przetwarzaniu adresu IP przez Cloudflare oraz przez instancję Umami (cel: statystyka odwiedzin,
   przetwarzanie przejściowe/hash, brak trwałego IP); lokalnym zapisie zgody w `localStorage`;
   braku cookies i profilowania; podstawie zgody dla analityki i sposobie jej odwołania; prawach
   osób oraz prawie skargi do UODO; ewentualnym transferze poza EOG.
2. **Polityka cookies** — sekcja powyższego: „serwis nie stosuje plików cookie; analityka Umami
   jest bezciasteczkowa i uruchamiana po zgodzie; w `localStorage` przechowywany jest zapis zgody".
3. **Aktualizacja przy zmianach** — przy dodaniu kolejnego narzędzia/skryptu: (a) podpiąć pod
   kategorię zgody w banerze (ładowanie wyłącznie po opt-in), (b) zaktualizować politykę, (c)
   zweryfikować podstawę prawną i ewentualny transfer danych.
4. **Umowy powierzenia (DPA)** — potwierdzić DPA z Cloudflare; w przypadku Umami administrator
   przetwarza dane we własnej infrastrukturze (brak procesora zewnętrznego dla samej analityki).

## 8. Słowniczek

- **Cookie** — niewielki plik zapisywany przez stronę w przeglądarce; może służyć m.in.
  śledzeniu. **W tym serwisie nieużywany.**
- **`localStorage`** — lokalny magazyn przeglądarki; tutaj przechowuje zapis zgody oraz (po
  rezygnacji z analityki) flagę `umami.disabled`.
- **Umami** — otwartoźródłowa, bezciasteczkowa platforma analityki webowej, hostowana samodzielnie
  przez administratora; alternatywa dla Google Analytics bez przekazywania danych do osób trzecich.
- **First-party** — zasób serwowany z domeny samego serwisu (tu: skrypt i zbieranie zdarzeń Umami
  przez proxy `/_a/`), a nie z domeny podmiotu trzeciego.
- **Procesor (podmiot przetwarzający)** — podmiot przetwarzający dane na zlecenie administratora;
  tu: Cloudflare (hosting/CDN/tunel).
- **Opt-in** — model, w którym kategorie nieobowiązkowe są domyślnie wyłączone do czasu zgody.
