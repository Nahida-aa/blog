import scrapy

class DoubanTop250Spider(scrapy.Spider):
    name = 'douban_top250'
    start_urls = ['https://book.douban.com/top250']

    def parse(self, response):
        for book in response.css('tr.item'):
            title = book.css('div.pl2 a::attr(title)').get()
            author = book.css('p.pl::text').get()
            rating = book.css('span.rating_nums::text').get()

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

        # 处理分页
        next_page = response.css('span.next a::attr(href)').get()
        if next_page is not None:
            next_page_url = response.urljoin(next_page)
            yield scrapy.Request(next_page_url, callback=self.parse)