# Vaatimusmäärittely: Web-Ohjelmoinnin Sovellusprojekti Ryhmä 6

**Versio:** 0.2  
**Päivämäärä:** 05.11.2026  
**Laatija:** Mikko Väisänen, Atte Paaso, Joni Ylimartimo, Janne Hietanen, Jaakko Paitsola <br>
**Tila:** Tarkennettu versio, alustava versio hyväksytetty asiakkaalla

## 1. Tausta ja tavoite

Elokuvaharrastajien on vaikea kokoontua yhteen ja organisoida keskustelua elokuvista. Elokuvasuositukset hukkuvat ja kukaan ei muista mitä oli sovittu katsottavaksi, ja tapahtuman tietoja on vaikea etsiä ja/tai muistella.

**Tavoite:** Elokuvaharrastajat voivat järjestäytyä ryhmiin, tehdä arvosteluja elokuvista, lisätä suosikkeja tai 'katseltavaksi myöhemmin' backlogiin elokuvia, ja keskustella elokuvista.

**Onnistumisen mittarit (sovittava asiakkaan kanssa):**
- (TBA)
- (TBA)
- Sovellusta voidaan käyttää puhelimen selaimessa ilman erillistä asennusta.

## 2. Käyttäjät ja roolit

| Rooli | Tarve | Oikeudet |
|---|---|---|
| Vierailija | Selata elokuvia, jaettuja listoja ja julkisia ryhmiä ja arvosteluja | Katsella elokuvien tietoa ja julkiseksi merkittyjä arvosteluja. |
| Käyttäjä | Vierailijan tarpeet, ryhmien tekeminen sekä niihin liittyminen ja arvosteluiden tekeminen | Sama kuin vierailijalla, lisänä arvosteluihin liittyvien tietojen lisäys ja muokkaus. Ryhmien tekemiseen vaadittavien tietojen lisääminen. |
| Ryhmän ylläpitäjä | Suunnitella ja ylläpitää ryhmiä.  | Ryhmänhallinta, oikeus poistaa sopimattomia arvosteluita ryhmän sisällä. |
| Sivuston ylläpitäjä | Hallita sivustoa ja ylläpitää yhteisöä.  | Koko sivuston ylläpito |

**Sovelluksen rajaus:** Sovellus palvelee aluksi pieniä harrastusryhmiä. Käyttäjätunnukset luodaan rekisteröinnillä. Jatkokehitysideana on laajentaa palvelualuetta koko Suomen elokuvayhteisölle tai jopa kansainväliseksi. Kaupallinen toiminta mahdollista tulevaisuudessa.

## 3. Käyttötilanne

### Vieras
1. Vierailija saapuu sivustolle.
2. Vierailijalle esitetään elokuvavalikoima.
3. Vierailija pystyy hakemaan haluamiaan elokuvia.
4. Vierailija pystyy lukemaan muiden julkiseksi asetettuja arvosteluita.
5. Vierailija voi halutessaan rekisteröityä ja kirjautua sivustolle.

### Käyttäjä
1. Käyttäjä kirjautuu sivustolle.
2. Käyttäjälle esitetään elokuvavalikoima.
3. Käyttäjä pystyy hakemaan halumiaan elokuvia.
4. Käyttäjä pystyy perustamaan ryhmiä ja tehdä elokuvalistoja.
5. Käyttäjä pystyy lukemaan muiden julkiseksi asetettuja arvosteluita.
6. Käyttäjä pystyy lukemaan muiden ryhmäläisten arvosteluita.
7. Käyttäjä pystyy tekemään omia arvosteluita.
8. Käyttäjä pystyy löytämään ja lähettämään liittymispyyntöjä ryhmille.

### Ryhmän ylläpitäjä
1. Ryhmän ylläpitäjä on käyttäjä, joka voi vastata ryhmän liittymispyyntöihin.
2. Ryhmän ylläpitäjä voi poistaa käyttäjiä ryhmästä.
3. Ryhmän ylläpitäjä voi antaa ylläpitöoikeuksia muille ryhmäläisille, tai poistaa ryhmän.

## 4. Toiminnalliset vaatimukset

Jokaisella vaatimuksella on yksilöllinen tunniste. **Must** tarkoittaa ensimmäisen käyttökelpoisen version kannalta välttämätöntä, **Should** tärkeää mutta lykättävissä olevaa ja **Could** mahdollista lisäominaisuutta.

| ID | Vaatimus | Prioriteetti |
|---|---|---|
| FR-01 | Kuka tahansa sivustolle päästyään voi nähdä elokuvalistauksen. | Must |
| FR-02 | Elokuvan tiedoissa näytetään nimi, julkaisuvuosi, kuvaus, esiintyjät, ohjaaja ja arvostelut. | Must |
| FR-03 | Käyttäjä voi hakea elokuvia elokuvan nimen, näyttelijän, ohjaajaan ja aikakauden mukaan. | Must |
| FR-04 | Käyttäjä voi rekisteröityä ja kirjautua palveluun. | Must |
| FR-05 | Käyttäjä voi luoda ryhmän. | Must |
| FR-06 | Käyttäjä voi lähettää liittymispyynnön haluttuihin ryhmiin. | Must |
| FR-07 | Käyttäjä voi kirjoittaa arvostelun elokuvasta. | Must |
| FR-08 | Käyttäjä voi kirjautua omalla tunnuksellaan ja salasanallaan. | Must |
| FR-09 | Ryhmän tapahtuvat ovat nähtävillä ryhmän jäsenille. | Must |
| FR-10 | Eritasoisia ylläpito-oikeuksia käyttäjille. | Must |
| FR-11 | Käyttäjä voi luoda ja jakaa elokuvalistoja. | Must |
| FR-12 | Ryhmän sisäinen chat-toiminto. | Must |
| FR-13 | Elokuvateattereitten näytöstiedot | Could |

### 4.1 Tarkemmat hyväksymiskriteerit: FR-03 (ilmoittautuminen)

### 4.2 Tarkemmat hyväksymiskriteerit: FR-06 (tapahtuman luonti)

## 5. Ei-toiminnalliset vaatimukset

Numeeriset rajat ovat **esimerkkitavoitteita**, jotka tulee oikeassa projektissa sopia asiakkaan kanssa ja testata.

| ID | Vaatimus | Todentaminen |
|---|---|---|
| NFR-01 |Skaalautuvuus mobiililaitteille|Toimiva mobiilisovellus|
| NFR-02 |Tietoturva|Autentikointi|
| NFR-03 | Salasanat tallennetaan vain turvallisella yksisuuntaisella salasanatiivisteellä. | Toteutuksen ja tietokannan tarkistus |
| NFR-04 | Käyttäjä ei voi hakea tai muuttaa toisen käyttäjän tietoja ilman roolinsa mukaista oikeutta. | API:n käyttöoikeustestit |
| NFR-05 | Sovellusta käytetään tuotantoympäristössä HTTPS-yhteydellä. | Julkaistun osoitteen tarkistus |
| NFR-06 | Fiksu ulkoasu | Asiakkaan hyväksymä ulkoasu |

## 6. Tiedot ja alustava tietomalli

Sovellus tallentaa vähintään seuraavat tiedot:

- **Käyttäjä:** tunniste, nimi, sähköposti, salasanatiiviste ja rooli.
- **Ryhmä:** Jäsenet, nimi, arvostelut, ja elokuvalistat.
- **Arvostelu:** Arvosana, arvostelija, päivämäärä ja elokuva.

Sovellus käyttää The Movie Databasen tietokantaa lähteenä elokuvien tiedoille

Tarkempi ER-kaavio tehdään erilliseen tietokantasuunnitelmaan.

## 7. Projektin rajaus

**Ensimmäiseen julkaisuun (MVP) sisältyvät:** Elokuvien ja arvostelujen näyttäminen. Käyttäjätilin luominen ja tallentaminen. Sisäänkirjautuminen. Arvostelujen tekeminen. Elokuvalistojen tekeminen sekä jakaminen. Käyttöliittymän toimivuus puhelimessa ja julkaisu Azureen kuuluvat myös valmiin tuotteen vaatimuksiin.

**Ei toteuteta tässä kahdeksan viikon projektissa:** maksut, kansainväliseksi laajentaminen, tekoäly-agenttien käyttäminen sovelluksessa.

Rajaus ja Must-prioriteetit hyväksytetään asiakkaalla. Niitä voidaan muuttaa, kun toteutuksen työmäärä tarkentuu.

## 8. Toteutusjärjestys ja alustava viikkosuunnitelma

Tämä on **esimerkkisuunnitelma**, ei asiakkaan hyväksymä aikataulu. Ensimmäinen arvo syntyy, kun tapahtumia voi nähdä ja ilmoittautua niihin; tekniset riippuvuudet, kuten tunnistautuminen, toteutetaan hallitusti tämän ympärille.

| Viikko | Tavoite ja näytettävä tulos |
|---|---|
| 1 | Vaatimukset, tietokantasuunnitelma, backlog ja ensimmäinen Azure-julkaisu hyväksyttyyn pohjaan |
| 2 | Julkaistussa sovelluksessa näkyy oikeasta tietokannasta haettu elokuvalista. Rekisteröinti ja sisäänkirjautuminen toimii. |
| 3 | Rekisteröinti ja sisäänkirjautuminen toimii. |
| 4 | Ryhmien luonti ja jäsenten lisääminen niihin. |
| 5 | Arvostelujen tekeminen |
| 6 | Elokuvalistat ja niiden jakaminen |
| 7 | Viimeistely, dokumentit, testaus ja tuotantoversion vakauttaminen |
| 8 | Loppuesitys ja toimivan julkaistun sovelluksen esittely |

**Huom.** Varhaisissa demoissa voidaan käyttää rajattua testikäyttäjää tai testitunnistusta. Oikeat käyttöoikeudet ja turvallisuusvaatimukset on toteutettava ennen todellisten käyttäjien käyttöönottoa.

## 9. Definition of Done – milloin vaatimus on valmis?

Vaatimusta ei merkitä valmiiksi vain siksi, että se toimii kehittäjän omalla koneella. Valmis ominaisuus täyttää kaikki seuraavat ehdot:

- [ ] Toteutus vastaa hyväksyttyjä vaatimuksia ja hyväksymiskriteerejä.
- [ ] Koodi on GitHubissa, katselmoitu ja yhdistetty yhteiseen haaraan.
- [ ] Tarvittavat automaattiset testit menevät läpi.
- [ ] Ominaisuus toimii oikean palvelimen ja tietokannan kanssa.
- [ ] Ominaisuus on julkaistu Azureen ja testattu julkaistusta osoitteesta.
- [ ] Tiimi osaa esitellä ja selittää toteutuksen.
- [ ] Tarvittava dokumentaatio on päivitetty.
- [ ] Koodi menee lintteristä läpi.

**Esimerkiksi:** FR-01 on valmis vasta, kun sovelluksen auetessa esitetään elokuvalista.

## 10. Avoimet kysymykset ja oletukset

| ID | Kysymys asiakkaalle | Tila |
|---|---|---|
| Q-01 | Halutaanko käyttäjärooleihin koko sivuston ylläpitäjä, ja kuinka laajat oikeudet ylläpitäjälle halutaan? | Ratkaistu: Ei tarvi |
| Q-02 | Mitä tietoja käyttäjältä kysytään ja tallennetaan rekisteröitymisen yhteydessä? | Avoin: Selvittäkää tarvitaanko tietosuojakäytäntöä. Nimimerkki ja sähköposti |
| Q-03 | Mitä vapaaehtoisia tunnistetietoja käyttäjä voi asettaa itselleen? Esimerkiksi: Voiko käyttäjä valita lempi elokuvakategoriat, jolloin asiakkaalle voidaan suositella siihen liittyviä elokuvia. | Avoin |
| Q-04 | Voiko käyttäjä arvostella elokuvan jättämättä kommenttia? | Ratkaistu: Kyllä voi, ja arvostelu jättää aikamerkin |
| Q-05 | Voiko ryhmällä olla useita ylläpitäjiä? | Ratkaistu: Ryhmällä voi olla useampi ylläpitäjä. |
| Q-06 | Onko sovelluksessa tarkoitus olla kaverilistaa? | Ratkaistu: Ryhmät toimivat kaverilistoina. |
| Q-07 | Halutaanko muokattavaa käyttäjäprofiilia? | Ratkaistu: Yksinkertainen käyttäjäprofiili vaaditaan, mutta esim. suosikkigenrejä ei tarvitse olla profiilissa. Olisi suotavaa, että sovellus osaa suositella käyttäjälle sen makuprofiiliin sopivia elokuvia, mutta tämän implementaatio on vielä avoinna. |

## 11. Hyväksyntä ja muutosten hallinta

Vaatimusmäärittely käydään asiakkaan kanssa läpi **ennen varsinaisen toteutuksen etenemistä**. Hyväksynnässä tarkistetaan erityisesti tavoitteet, ensimmäisen version rajaus, Must-vaatimukset ja avoimet kysymykset.

| Kenttä | Arvo |
|---|---|
| Asiakkaan edustaja | _________________________ |
| Hyväksytty versio | _________________________ |
| Hyväksynnän päivämäärä | _________________________ |
| Mahdolliset ehdot | _________________________ |

Muutokset kirjataan dokumentin versiohistoriaan ja GitHubin backlogiin. Asiakas ja tiimi arvioivat yhdessä niiden vaikutuksen aikatauluun ja prioriteetteihin.

## 12. Versiohistoria

| Versio | Päivä | Muutos |
|---|---|---|
| 0.1 | 28.10.2026 | Alustava vaatimusmäärittely |
| 0.2 | 30.10.2026 | Ensimmäinen asiakaspalaveri |

## Scrum-tiimi ja työskentelytavat
 - Product Owner: Jouni Juntunen
 - Scrum Master: Vaihtelee viikottain kehittäjien kesken
 - Kehittäjät: Joni Ylimartamo, Jaakko Paitsola, Mikko Väisänen, Janne Hietanen ja Atte Paaso
 - Sprintin pituus: 1 viikko
 - Definition of Done: [Definition of Done](https://github.com/Jakespakes/Websovellus-projekti/tree/main/docs/definition-of-done.md)
 
