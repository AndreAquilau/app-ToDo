#### CLI Typeorm
~~~bash
--rodar migrations
yarn typeorm migration:run

--criar uma migration
yarn typeorm migration:create -- -n createUser

--gerar migrations a partir das model
yarn typeorm migration:generate -- -n createUser

--reverte uma magration
yarn typeorm migration:revert


--criar uma model
yarn typeorm entity:create -- -n User
~~~
