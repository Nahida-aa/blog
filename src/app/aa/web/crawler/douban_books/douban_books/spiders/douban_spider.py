import scrapy

class DoubanSpider(scrapy.Spider):
    name = 'douban'
    start_urls = ['https://book.douban.com/chart']

    def parse(self, response):
        for book in response.css('div.media__body'):
            title = book.css('h2 a::text').get()
            author = book.css('p.subject-abstract::text').get()
            rating = book.css('span.font-small.color-red::text').get()

            # 检查元素是否存在并处理
            if title:
                title = title.strip()
            if author:
                author = author.strip().split('/')[0]
            if rating:
                rating = rating.strip()

            yield {
                'Title': title,
                'Author': author,
                'Rating': rating,
            }

        next_page = response.css('span.next a::attr(href)').get()
        if next_page is not None:
            yield response.follow(next_page, self.parse)