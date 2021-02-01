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
                return;
            } 
            if (item.quality < 50) {
                item.quality++;
            }
            if (item.quality < 50 && item.sellIn < 10) {
                item.quality++;
            }
            if (item.quality < 50 && item.sellIn < 5) {
                item.quality++;
            }         
        }
    }

    handleRegularItems(item) {
        if (item.name != 'Aged Brie' && 
            item.name != 'Backstage passes to a TAFKAL80ETC concert' && 
            item.name != 'Sulfuras, Hand of Ragnaros') {
            if (item.quality > 0) {
                item.quality--;
            }
            item.sellIn--;
            if (item.sellIn < 0 && item.quality > 0) {
                item.quality--;
            }
        }
    }

    updateQuality() {
        for (let i = 0; i < this.items.length; i++) {
            this.handleSulfuras(this.items[i]);
            this.handleAgedBrie(this.items[i]);
            this.handleBackstagePasses(this.items[i]);
            this.handleRegularItems(this.items[i]);
        }
        return this.items;
    }
}
