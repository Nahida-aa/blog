import requests
from bs4 import BeautifulSoup
import csv

# 目标URL
url = 'https://book.douban.com/chart'

# 发送HTTP请求
response = requests.get(url)

# 检查请求是否成功
if response.status_code == 200:
    # 解析HTML内容
    soup = BeautifulSoup(response.text, 'html.parser')
    
    # 查找所有书籍信息
    books = soup.find_all('div', class_='media__body')
    
    # 打开CSV文件，准备写入数据
    with open('douban_books.csv', 'w', newline='', encoding='utf-8') as csvfile:
        fieldnames = ['Title', 'Author', 'Rating']
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        
        # 写入表头
        writer.writeheader()
        
        # 写入每本书的信息
        for book in books:
            title = book.find('a').get_text(strip=True)
            author = book.find('div', class_='subject-abstract').get_text(strip=True).split('/')[0]
            rating = book.find('span', class_='font-small color-lightgray').get_text(strip=True)
            writer.writerow({'Title': title, 'Author': author, 'Rating': rating})
    
    print('数据已成功写入 douban_books.csv 文件')
else:
    print('请求失败，状态码：', response.status_code)