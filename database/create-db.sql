SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

DROP SCHEMA IF EXISTS `vsr` ;
CREATE SCHEMA IF NOT EXISTS `vsr` DEFAULT CHARACTER SET latin1 ;
USE `vsr` ;

-- -----------------------------------------------------
-- Table `vsr`.`department`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `vsr`.`department` (
  `dept_id` INT(11) NOT NULL AUTO_INCREMENT,
  `address` VARCHAR(256) NOT NULL,
  `details` VARCHAR(256) NULL DEFAULT NULL,
  `dept_name` VARCHAR(64) NOT NULL,
  `dept_code` VARCHAR(16) NOT NULL,
  PRIMARY KEY (`dept_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = latin1;

CREATE UNIQUE INDEX `uk_dept_code` ON `vsr`.`department` (`dept_code` ASC);

CREATE UNIQUE INDEX `uk_dept_name` ON `vsr`.`department` (`dept_name` ASC);


-- -----------------------------------------------------
-- Table `vsr`.`station`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `vsr`.`station` (
  `stn_id` INT(11) NOT NULL AUTO_INCREMENT,
  `district` VARCHAR(32) NOT NULL,
  `stn_code` VARCHAR(6) NOT NULL,
  `state` VARCHAR(32) NOT NULL,
  `stn_name` VARCHAR(32) NOT NULL,
  PRIMARY KEY (`stn_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = latin1;

CREATE UNIQUE INDEX `uk_stn_code` ON `vsr`.`station` (`stn_code` ASC);

CREATE UNIQUE INDEX `uk_stn_name` ON `vsr`.`station` (`stn_name` ASC);


-- -----------------------------------------------------
-- Table `vsr`.`faremap`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `vsr`.`faremap` (
  `fare_id` INT(11) NOT NULL AUTO_INCREMENT,
  `fare` FLOAT NOT NULL,
  `from_stn_id` INT(11) NOT NULL,
  `to_stn_id` INT(11) NOT NULL,
  PRIMARY KEY (`fare_id`),
  CONSTRAINT `fk_fares_tostn`
    FOREIGN KEY (`to_stn_id`)
    REFERENCES `vsr`.`station` (`stn_id`),
  CONSTRAINT `fk_fares_fromstn`
    FOREIGN KEY (`from_stn_id`)
    REFERENCES `vsr`.`station` (`stn_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = latin1;

CREATE UNIQUE INDEX `uk_fares_fromto` ON `vsr`.`faremap` (`from_stn_id` ASC, `to_stn_id` ASC);

CREATE INDEX `fk_fares_tostn` ON `vsr`.`faremap` (`to_stn_id` ASC);


-- -----------------------------------------------------
-- Table `vsr`.`invoice`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `vsr`.`invoice` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `article_charges` FLOAT NOT NULL,
  `date` DATETIME NOT NULL,
  `dc_number` VARCHAR(32) NOT NULL,
  `description` VARCHAR(256) NULL DEFAULT NULL,
  `doordel_charges` FLOAT NOT NULL,
  `freight` FLOAT NOT NULL,
  `from_address` VARCHAR(256) NULL DEFAULT NULL,
  `goods_value` FLOAT NOT NULL,
  `handling_charges` FLOAT NOT NULL,
  `other_charges` FLOAT NOT NULL,
  `package_count` INT(11) NOT NULL,
  `stat_charges` FLOAT NOT NULL,
  `to_address` VARCHAR(256) NULL DEFAULT NULL,
  `total` FLOAT NOT NULL,
  `gst` FLOAT NOT NULL,
  `value_surcharge` FLOAT NOT NULL,
  `waybill_number` VARCHAR(16) NOT NULL,
  `weight` FLOAT NOT NULL,
  `dept_id` INT(11) NOT NULL,
  `from_stn_id` INT(11) NOT NULL,
  `to_stn_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_invc_tostn`
    FOREIGN KEY (`to_stn_id`)
    REFERENCES `vsr`.`station` (`stn_id`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT `fk_invc_deptid`
    FOREIGN KEY (`dept_id`)
    REFERENCES `vsr`.`department` (`dept_id`),
  CONSTRAINT `fk_invc_fromstn`
    FOREIGN KEY (`from_stn_id`)
    REFERENCES `vsr`.`station` (`stn_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;

CREATE INDEX `fk_invc_deptid` ON `vsr`.`invoice` (`dept_id` ASC);

CREATE INDEX `fk_invc_fromstn` ON `vsr`.`invoice` (`from_stn_id` ASC);

CREATE INDEX `fk_invc_tostn` ON `vsr`.`invoice` (`to_stn_id` ASC);


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
