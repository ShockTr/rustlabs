import fetch from "node-fetch";
import cheerio from "cheerio";

export async function getItemList() : Promise<GenericItem[]> {
    let res = await fetch("https://rustlabs.com/group=itemlist")
    let html = await res.text()
    const $ = cheerio.load(html)
    let items: GenericItem[] = []
    $(".info-block").children("a").each((i,el) => {
        const name = $(el).text()
        const url = `https://rustlabs.com${$(el).attr("href")}`
        const logo = `https:${$(el).find("img").attr("src").replace("items40", "items180")}`
        const category = $(el).prevAll("h2").first().text()
        items.push({ name, url, logo, category })
    })
    return items
}
export interface GenericItem {
    name: string
    url: string
    logo: string
    category: string
}
