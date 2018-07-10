ќписание всех эмитов находитс€ в 
https://docs.google.com/spreadsheets/d/1L1ccKviPIm1dpGYeUiFvShRErM4BG8ZwiCpY-eUsiHg/edit?usp=drive_web

¬се исполнители наход€тс€ в папке modules.

Ќе описанные в файле модули.
db.js - модуль дл€ работы с базами данных
inout.js - модуль дл€ определени€ входних данных.
marketEmulation.js - модуль дл€ эмул€ции рынка.

дл€ запуска эмул€ции рынка на мес€ц ,нужно выполнить в centOs
pm2 start test
или
pm2 restart test если запущен

если pm2 очистилс€ то 
cd /var/www/banan
pm2 start test.js


дл€ запуска основной части ,нужно выполнить в centOs
pm2 start index
или
pm2 restart index если запущен

если pm2 очистилс€ то 
cd /var/www/banan
pm2 start index.js


дл€ запуска рынка ,нужно выполнить в centOs
pm2 start MarketEmulation
или
pm2 restart MarketEmulation если запущен

если pm2 очистилс€ то 
cd /var/www/banan
pm2 start MarketEmulation.js