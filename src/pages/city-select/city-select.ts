import { CityProvider } from './../../providers/cityprovider';
import { Component, ViewChildren, ViewChild } from '@angular/core';
import { NavController, Content } from 'ionic-angular';

@Component({
  selector: 'city-select',
  templateUrl: 'city-select.html',
  providers: [CityProvider]
})
export class CitySelectPage {

  indexes: Array<string> = []
  cities: Array<any> = [];
  filterCities: Array<any> = [];

  @ViewChildren('cityGroup') cityGroup;
  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController, public cityProvider: CityProvider) {
    this.indexes = cityProvider.getIndexes();
    this.cities = cityProvider.getGroupCities();
  }
  ionViewDidLoad() {
    var $this = this;
    function alphabetMove(e, move) {
      var pPositionY = e.changedTouches[0].clientY
      var currentItem, targetItem;
      var d = document;
      currentItem = d.elementFromPoint(d.body.clientWidth - 1, pPositionY);
      if (!currentItem || currentItem.className.indexOf('index-bar') < 0) return;
      targetItem = document.getElementById(currentItem.innerText);
      document.getElementById('indexs-title').style.display = 'block'
      document.getElementById('indexs-title').innerText = currentItem.innerText;
      if (move) {
        var index = $this.indexes.join('').indexOf(currentItem.innerText);
        $this.content.scrollTo(0, $this.cityGroup._results[index].nativeElement.offsetTop, 300);
      }
    }
    var indexsBar = document.getElementById('indexs-bar');
    indexsBar.addEventListener('touchstart', function (e) {
      alphabetMove(e, false);
    });
    indexsBar.addEventListener('touchmove', e => {
      alphabetMove(e, false);
    });
    indexsBar.addEventListener('touchend', function (e) {
      alphabetMove(e, true);
      document.getElementById('indexs-title').style.display = 'none';
    });
  }
 
  citySelect(city) {
    console.log(JSON.stringify(city));
    window.localStorage["cache_currentCity"] = JSON.stringify(city);
  }

  getItems(e) {
    var newVal = e.target.value;
    if (newVal) {
      this.filterCities = this.cityProvider.filterCities(newVal);
    }
    else {
      this.filterCities = [];
    }
    this.content.scrollToTop(500);
  }
}
