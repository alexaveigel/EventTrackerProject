-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mooddb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `mooddb` ;

-- -----------------------------------------------------
-- Schema mooddb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mooddb` DEFAULT CHARACTER SET utf8 ;
USE `mooddb` ;

-- -----------------------------------------------------
-- Table `mood`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mood` ;

CREATE TABLE IF NOT EXISTS `mood` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `type` VARCHAR(45) NOT NULL,
  `intensity` INT NULL,
  `length_hours` DECIMAL(10,1) NULL,
  `place` VARCHAR(100) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

SET SQL_MODE = '';
DROP USER IF EXISTS mood@localhost;
SET SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
CREATE USER 'mood'@'localhost' IDENTIFIED BY 'mood';

GRANT SELECT, INSERT, TRIGGER, UPDATE, DELETE ON TABLE * TO 'mood'@'localhost';

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `mood`
-- -----------------------------------------------------
START TRANSACTION;
USE `mooddb`;
INSERT INTO `mood` (`id`, `type`, `intensity`, `length_hours`, `place`) VALUES (1, 'angry', 5, 1.5, 'home');
INSERT INTO `mood` (`id`, `type`, `intensity`, `length_hours`, `place`) VALUES (2, 'happy', 10, 2, 'work');
INSERT INTO `mood` (`id`, `type`, `intensity`, `length_hours`, `place`) VALUES (3, 'sad', 2, 4.4, 'school');

COMMIT;

