export class Item {
    name: string;
    sellIn: number;
    quality: number;

    constructor(name, sellIn, quality) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }
}

export class GildedRose {
    items: Array<Item>;

    constructor(items = [] as Array<Item>) {
        this.items = items;
    }

    handleSulfuras(item) {
        if (item.name == 'Sulfuras, Hand of Ragnaros') {
            return new Item('Sulfuras, Hand of Ragnaros', 0, 80);
        }
    }

    handleAgedBrie(item) {
        if (item.name == 'Aged Brie') {
            if (item.quality < 50) {
                item.quality++;                
            }            
            item.sellIn--;
            if (item.sellIn < 0) {
                item.quality++;
            }
        }
    }

    handleBackstagePasses(item) {
        if (item.name == 'Backstage passes to a TAFKAL80ETC concert') {
            item.sellIn--;
            if (item.sellIn < 0) {
                item.quality = 0;
            } else {
                if (item.quality < 50) {
                    item.quality++;
                }
                if (item.quality < 50 && item.sellIn < 11) {
                    item.quality++;
                }
                if (item.quality < 50 && item.sellIn < 6) {
                    item.quality++;
                }
            }         
        }
    }

    updateQuality() {
        for (let i = 0; i < this.items.length; i++) {
            this.handleSulfuras(this.items[i]);
            this.handleAgedBrie(this.items[i]);
            this.handleBackstagePasses(this.items[i]);
            // if (this.items[i].name != 'Aged Brie' && this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
            //     if (this.items[i].quality > 0) {
            //         if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
            //             this.items[i].quality = this.items[i].quality - 1
            //         }
            //     }
            // } else {
            //     if (this.items[i].quality < 50) {
            //         this.items[i].quality = this.items[i].quality + 1
            //         if (this.items[i].name == 'Backstage passes to a TAFKAL80ETC concert') {
            //             if (this.items[i].sellIn < 11) {
            //                 if (this.items[i].quality < 50) {
            //                     this.items[i].quality = this.items[i].quality + 1
            //                 }
            //             }
            //             if (this.items[i].sellIn < 6) {
            //                 if (this.items[i].quality < 50) {
            //                     this.items[i].quality = this.items[i].quality + 1
            //                 }
            //             }
            //         }
            //     }
            // }
            // if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
            //     this.items[i].sellIn = this.items[i].sellIn - 1;
            // }
            // if (this.items[i].sellIn < 0) {
            //     if (this.items[i].name != 'Aged Brie') {
            //         if (this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
            //             if (this.items[i].quality > 0) {
            //                 if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
            //                     this.items[i].quality = this.items[i].quality - 1
            //                 }
            //             }
            //         } else {
            //             this.items[i].quality = this.items[i].quality - this.items[i].quality
            //         }
            //     } else {
            //         if (this.items[i].quality < 50) {
            //             this.items[i].quality = this.items[i].quality + 1
            //         }
            //     }
            // }
        }

        return this.items;
    }
}
