CREATE DATABASE `finelf_recruitment_task`

CREATE TABLE `finelf_recruitment_task`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `username` VARCHAR(100) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(100) NOT NULL,
  `website` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  UNIQUE INDEX `phone_UNIQUE` (`phone` ASC) VISIBLE);

CREATE TABLE `finelf_recruitment_task`.`companies` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `catchPhrase` VARCHAR(255) NOT NULL,
  `bs` VARCHAR(255) NOT NULL,
  `userId` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE,
  UNIQUE INDEX `userId_UNIQUE` (`userId` ASC) VISIBLE,
  CONSTRAINT `user_company`
    FOREIGN KEY (`userId`)
    REFERENCES `finelf_recruitment_task`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

CREATE TABLE `finelf_recruitment_task`.`posts` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `body` TEXT NOT NULL,
  `userId` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `title_UNIQUE` (`title` ASC) VISIBLE,
  INDEX `user_post_idx` (`userId` ASC) VISIBLE,
  CONSTRAINT `user_post`
    FOREIGN KEY (`userId`)
    REFERENCES `finelf_recruitment_task`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

CREATE TABLE `finelf_recruitment_task`.`comments` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `body` TEXT NOT NULL,
  `postId` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `post-comment_idx` (`postId` ASC) VISIBLE,
  CONSTRAINT `post-comment`
    FOREIGN KEY (`postId`)
    REFERENCES `finelf_recruitment_task`.`posts` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);