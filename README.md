# Yapılacaklar Listesi
- Bu bir To Do List yani Yapılacaklar Listesi web sitesidir. Ben bunu normal projeden biraz daha fazla geliştirdim. Yapılacak işlere tarih özelliği ekledim.Örneğin: yapılacak bir iş girdiniz sonra bir bitiş tarihi girmeniz gerekiyor. Sonra ben bu bitiş tarihini aldım milisaniyeye çevirdim ve sonra bugünün tarihini alıp onuda milisaniyeye çevirdim sonra bitiş tarihinden bugünün tarhini çıkarıp kalan süreyi buldum. Sonrasında kalan süreyi güne çevirip htmle ekledim. Tabiki sadece bunla kalmayıp birde bunlara geri sayım ekledim. Bu geri sayım dolana kadar kullanıcı yapacağı işi tamamlandı olarak işaretlemezse geri sayım bittiğinde yapılacak iş listeden silinip red zone' a yani Başarısız Listesine düşüyor ve üstü çiziliyor. Kullanıcılar bunu görebilsin diye sayacı 10 saniyeye ayarladım. Yani 10 saniyede 1 gün sayısı azalacak şekilde ayarladım. Bunun yanı sıra bir green zone yaptım. Burada ise tamamlandı olarak işaretlenen todolar gözüküyor. Tamamlanan işler hem ana listede hem green zone da görüntülenecek şekilde ayarlandı kullanıcı isterse ana listeden clear completed butonuna tıklayarak tamamlananları silebilir fakat green zone dan silemez. Yapılacak işlerin altında 2 tane filitreleme butonu mevcuttur. All butonu bütün todoları gösterirken Active butonu tamamlanmayan todoları listeler. Completed butonu ise seçilen todoyu tamamlandı olarak işaretler fakat tamamlandı olarak işaretlenen todolar bir daha değiştirelemez. Ayrıca yapılacak işlerin üzerine geldiğinizde sağda silme butonu gözükür bu butona tıkladığınızda yapılacak olan iş silinir ve red zone da iptal edildi olarak işaretlenir. Tema değiştirme butonu mevcuttur kullanıcı isterse aydınlık modda yada karanlık modda kullanabilir.

### Ekran Görüntüsü

![Ekran Görüntüsü](./assets/images/Ekran%20Alıntısı.png)
![Ekran Görüntüsü](./assets/images/Ekran%20Alıntısı1.png)
![Ekran Görüntüsü](./assets/images/Ekran%20Alıntısı2.png)

### Links

- Site Url'i: [To-Do-List](https://to-do-list-new.vercel.app/)

### Meydan okuma

Kullanıcılar şunları yapabilmelidir:

- Cihazlarının ekran boyutuna bağlı olarak uygulama için en uygun düzeni görüntüleme
- Sayfadaki tüm etkileşimli öğeler için fareyle üzerine gelme durumlarını görün
- Listeye yeni yapılacaklar ekleyin
- Yapılacakları tamamlandı olarak işaretleyin
- Yapılacak işleri listeden silme
- Tüm/aktif/tamamlanmış todolara göre filtreleme
- Tamamlanan tüm yapılacakları temizleyin
- Açık ve koyu modu değiştirme
- Bonus\*\*: Listedeki öğeleri yeniden sıralamak için sürükleyip bırakın

### Genel Bakış

- Javascript kodları ifee fonksiyonları içine yazılmıştır. Sonrada ekleme yada geliştirme yapacak kişiler dikkat etmelidir.
- Responsive tasarımı mevcut olup farklı cihazlarda da görüntü bozulmamaktadır.
- Css kodları scss şeklinde yazılmıştır. Ekleme yada geliştirme yapacak kişi style.scss dosyasını compile etmelidir.
- Js ve CSS kodları modüler olarak yazılmıştır.

### İle İnşa Edilmiştir

- HTML5
- CSS
- Flexbox
- SCSS
- Mobil Tasarım
- JavaScript

### Ne öğrendim
Bu Bölümde bu projeyi oluştururken yeni öğrendiğim bazı bilgiler yer almakta. Öncelikle validate işlemini bu kadar düzenli ve kısaltarak kullanma yöntemini bilmiyordum araştırdım ve gördüm benim için çok kullanışlı oldu. Bir de drag and drop işlemini gördüm ve uygulamaya çalıştım yani öğeleri sürükle bırak işlemi. Şimdilik sadece  yukardaki öğeyi aşağıya sürüklemeyi başardım, aşağıdaki öğeler yukarı sürüklenmiyor ama diğer projelerde bu sorunu halledeceğimi düşünüyorum.

```html
 <li draggable="true" class="js-todo ${data.status}" data-id="${data.id}"><li>
```

```js
const validationRules = [
  {
    func: validate.checkEmpty,
    field: todoInputValue,
    message: validationMessages.emptyInput,
  },
  {
    func: validate.checkEmpty,
    field: dateInputValue,
    message: validationMessages.emptyInput,
  },
  {
    func: validate.checkPastDate,
    params: [enteredDate, todayDate],
    message: validationMessages.pastDate,
  },
  {
    func: validate.checkFormat,
    field: todoInputValue,
    message: validationMessages.invalidFormat,
  },
];

const _dragStart = function (e) {
  draggedItem = e.target;

  e.dataTransfer.setData("text/plain", draggedItem.textContent);
};
const _dragOver = function (e) {
  e.preventDefault();
};
const _drop = function (e) {
  e.preventDefault();

  if (e.target.tagName === "li") {
    const droppedItem = e.target;
    todoList.insertBefore(draggedItem, droppedItem);
  } else {
    todoList.appendChild(draggedItem);
  }
};
```

## Kurulum

1. Projeyi Kopyalayın
   İlk olarak, projeyi yerel bilgisayarınıza kopyalamk için GitHub'dan klonlayın:

```bash
git clone https://github.com/Brkcnulusy/To-Do-List.git
cd To-Do-List

```

2. Bağımlılıkları Yükleyin
   Herhangi bir Bağlılığı bulunmamaktır. Projece vanilya.js ile yazılmıştır.

3. Uygulamayı Çalıştırın
   Eğer Live Server uzantısı yüklü ise html dosyasına sağ tıklayıp ilk seçenek olan Live Server ile Açın seçeneğine tıklayıp açabilirsiniz.
   Live Server uzantısına sahip değilseniz terminale npm run dev yazarak ve Tarayıcınızda http://localhost:3000 adresine giderek uygulamayı kullanmaya başlayabilirsiniz.

## Yazar

- Website - [Burak Can Ulusoy](https://mavifloravakfi.com/)
- LinkedIn - [@Brkcnulusy](https://www.linkedin.com/in/burak-can-ulusoy-375120272/)
- GitHub - [@Burakcnulusy](https://github.com/Brkcnulusy/)
- E-Mail - [brkcnulusy@gmail.com]

## Teşekkür

Bu projeyi frontend mentor adlı sitede gördüm ve yapmaya karar verdim. Site proje için gerekli olan tasarım resimleri ve sitede kullanmam gereken image dosyalarını benimle paylaştı. Frontend Mentor Ekibine teşekkür ederim.
