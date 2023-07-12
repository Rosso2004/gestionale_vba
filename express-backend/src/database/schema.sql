-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versione server:              10.4.28-MariaDB - mariadb.org binary distribution
-- S.O. server:                  Win64
-- HeidiSQL Versione:            12.3.0.6589
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dump della struttura del database gestionale_vba
CREATE DATABASE IF NOT EXISTS `gestionale_vba` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `gestionale_vba`;

-- Dump della struttura di tabella gestionale_vba.customers_suppliers
CREATE TABLE IF NOT EXISTS `customers_suppliers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` int(11) NOT NULL,
  `fnc` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `city` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `cap` varchar(255) DEFAULT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `piva` varchar(255) DEFAULT NULL,
  `iban` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_customers_suppliers_resources_type` (`type`),
  KEY `FK_customers_suppliers_resources_function` (`fnc`) USING BTREE,
  CONSTRAINT `FK_customers_suppliers_resources_function` FOREIGN KEY (`fnc`) REFERENCES `resources_function` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_customers_suppliers_resources_type` FOREIGN KEY (`type`) REFERENCES `resources_type` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=72 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dump dei dati della tabella gestionale_vba.customers_suppliers: ~52 rows (circa)
INSERT INTO `customers_suppliers` (`id`, `type`, `fnc`, `name`, `city`, `address`, `cap`, `phone_number`, `email`, `piva`, `iban`) VALUES
	(17, 18, 2, 'B4Web s.r.l.', 'Alessandria', 'Via della Chiatta, 29, Alessandria, AL, Italia', '15121', '0131 1926569', 'info@b4web.biz', '02344960063', ''),
	(18, 18, 1, 'AC GRAF Climatizzazione s.r.l.', 'Rivalta', 'Via Massimo D\'Antona, 7, Rivalta di Torino, TO, Italia', '10040', '011 904 8292', 'g.silano@acgraf.it', '011 904 8292', 'g.silano@acgraf.it'),
	(19, 18, 1, 'AM.SA s.r.l.', 'Aosta', 'Via Malherbes, 14, Aosta, AO, Italia', '11100', '011 222 2227', '', '00674210075', ''),
	(20, 18, 1, 'Arcoplastica s.r.l.', 'Andezeno', 'Strada Chieri, 79, Pino Torinese, Andezeno, TO, Italia', '10020', '011 943 3111', 'm.torta@arcoplastica.com', '04690780012', ''),
	(21, 18, 2, 'BMA s.r.l.', 'Villanova d\'asti', 'Strada per Chieri, 18, Villanova d\'Asti, AT, Italia', '14019', '011 945 3301', 'amministrazione@bmaservice.net', '01444410052', ''),
	(22, 18, 2, 'Dynamis s.r.l.', 'Novara', 'Via Pietro Generali, 68, Novara, Nordovest, Italia', '28100', '0321 457 643', 'segreteria@dynamis.it', '00860060037', ''),
	(23, 18, 1, 'Ediltubi s.p.a.', 'Trofarello', 'Via Torino, 280, Trofarello, TO, Italia', '10028', '335 761 2352', '', '00908850019', ''),
	(24, 18, 1, 'Fortek s.r.l.', 'Trofarello', 'Via la Pira, 17, Trofarello, TO, Italia', '10028', '011 680 4222', 'commerciale@fortek.it', '06857670019', 'IT 17 B 03069 31180 000003936312'),
	(25, 18, 2, 'Housedada s.n.c.', 'Torino', 'Via Pio Foà, 86, Torino, TO, Italia', '10125', '011 197 02030', 'info@housedada.com', '10654570018', ''),
	(26, 18, 1, 'Jollyplast s.r.l.', 'Sommariva Perno', 'Località Piano, 55, Sommariva Perno, CN, Italia', '12040', '0172 46142', '', '02471970042', ''),
	(27, 18, 1, 'Meridiana soc.cop', 'Torino', 'Via LA Marmora, 38, Bruzolo, Torino, Italia', '10124', '331 38221288', 'info@meridianasc.it', '10827560011', ''),
	(28, 18, 1, 'Stat s.p.a.', 'Beinasco', 'Via VIII Marzo, 6/10, Beinasco, TO, Italia', '10092', '011 398 7111', 'calogero.marino@statspa.com', '03796460016', ''),
	(29, 18, 2, 'VBA snc', 'Trofarello', 'Via Trieste, 30, Trofarello, TO, Italia', '10028', '3334554102', 'a.visca@vbanet.eu', '11118750014', ''),
	(30, 18, 1, 'Pasta &amp; Company s.p.a.', 'Rivalta', 'Via F. Gioia, Rivalta di Torino, TO, Italia', '', '', 'manutenzione@pastaecompany.it', '', ''),
	(31, 18, 1, 'Belgom', 'Trofarello', '', '', '', '', '', ''),
	(32, 18, 1, 'B&R s.r.l.', 'Mocalieri', 'Via Vittime del Vajont, 36, Moncalieri, TO, Italia', '10024', '011 647 0940', 'info@br-automotive.com', '00668370018', ''),
	(33, 18, 1, 'REA srl', 'Trofarello', 'Via Lombardi, 6, Trofarello, TO, Italia', '10028', '', 'andrea.falco@reasteamcleaning.com ', '', ''),
	(34, 18, 1, 'Frimed', 'Buttigliera d\'Asti', 'Via Riva, 29, Buttigliera D\'asti, AT, Italia', '', '', '', '', ''),
	(35, 18, 1, 'Autotrasporti Lusso s.r.l.', 'Trofarello', 'Via Enrico Fermi, 4', '10028', '0116489669', 'ivan@autrotrasportilusso.com', '06167070017', ''),
	(36, 18, 1, 'Moto Club Koala', 'Trofarello', 'Strada Sabbioni zona le dune', '10028', '3888587928', '', '94001630014', ''),
	(37, 18, 1, 'Apex srl', 'Mappano', 'strada Cuorgnè 51/3', '10072', '011 495010', 'pellicone@apex.to.it', '09365610014', ''),
	(38, 18, 1, 'Il Filo dei Colori', 'Trofarello', 'Via cesare battisti 46', '10028', '', '', '10393340012 ', ''),
	(39, 18, 1, 'Diamond Lap ', 'Trofarello', 'Strada Serene ', '10028', '', '', '', ''),
	(40, 18, 1, 'Giuseppe Savarola', 'Torino', '', '', '3701330429', 'b.savarola@icloud.com', '', ''),
	(41, 18, 1, 'Divia', '', '', '', '', '', '', ''),
	(42, 18, 1, 'Hutchinson', 'Rivoli', 'via Natale Bruno 35', '10090', '0119507411', 'andrea.airola@hutchinson.com', '11111111111', ''),
	(43, 18, 1, 'Elcom', 'Grugliasco', 'Strada del Portone 129', '10095', '', 'mino.casilli@elcom.to.it', '', ''),
	(44, 18, 2, 'Step Solutions', 'Grugliasco', 'Via Cenni, 17', '10095', '011 73 23 54', 'info@stepsolutions.eu', '', ''),
	(45, 18, 1, 'TRE ZETA GROUP S.R.L.', 'SAN MINIATO (PI)', '', '', '', '', '01842780502', ''),
	(46, 18, 1, 'Picco Bartolomeo', 'Asti', '', '', '', '', '', ''),
	(47, 18, 2, 'Infosegnali di Vicario', '', '', '', '', 'infovicario@tiscali.it', '06546970010', ''),
	(48, 18, 1, 'Ellena Spa', 'Brandizzo', 'Via Torino 315', '', '011 917 0075', 'INFO@ELLENASPA.COM', '00514800010', ''),
	(49, 18, 1, 'PLASTLAB S.C.AR.L.', 'Orbassano (TO)', 'Via dell’Artigianato, 2 Area Industriale Malosnà', '10043', '011.903.46.52', 'imma.delgrosso@plastlab.it', '09146550018', ''),
	(50, 18, 1, 'ACEA spa', 'Pinerolo', 'v. Vigone 42', '10064', '01212361', 'amministrazione@aceapinerolese.it', '05059960012', ''),
	(51, 18, 1, 'T-Erre srl', 'Ravarino - Modena (Italy)', 'Via Fratelli Montanari, 89', '41017', '', '', '', ''),
	(52, 18, 2, 'Rima componenti', 'Carmagnola', '', '', '', '', '', ''),
	(53, 18, 1, 'Turincontri', 'Torino', 'St. Cartman 35', '10132', '0118991244', 'moniaci@turincontri.it', '05754870011', ''),
	(54, 18, 1, 'Marus', 'Settimo torinese', 'VIA CASCINA BORNIOLA 54/G', '10036', '', '', '07590410630', ''),
	(55, 18, 1, 'Borin', 'Trofarello', 'V. Ferruccio Parri 12', '10028', '', 'info@borinlavorazionelamiera.it', '', ''),
	(56, 18, 1, 'Fratelli Chiaramello trasporti', 'Torino', 'VIA ROSTA, 11', '10143', '', '', '12273890017', ''),
	(57, 18, 1, 'TEXA s.r.l.', 'Chivasso', 'C.so M. D\'Azeglio, 8', '10125', '', '', '07272390019', ''),
	(58, 18, 1, 'Centro Ricerche FCA', 'Torino', '', '', '', '', '', ''),
	(59, 18, 1, 'Escofer', 'Trofarello', 'v. Enrico Fermi', '10028', '', 'escofer2019@gmail.com', '', ''),
	(60, 18, 1, 'Tristone Flowtech srl', 'Ciriè', 'v. Torino 142', '10073', '?+39 011 922 7611', 'luca.rosso@tristone.com', '', ''),
	(61, 18, 1, 'Progem', 'Carmagnola', 'Via Monteu Roero 12/16', '10022', '+39 011.971.496', 'info@progem.eu', '07519750017', ''),
	(62, 18, 1, 'Labormet due srl', 'Torino', 'c.so Orbassano 402/18', '', '011740905', 'info@labormetdue.it', '10729360015', ''),
	(63, 18, 2, 'Pneumax', '', '', '', '', '', '', ''),
	(64, 18, 2, 'Mattia', '', '', '', '', '', '', ''),
	(65, 18, 2, 'Solmantec s.r.l.', 'Torino', 'via Andrea Doria, 15', '10123', '3358016371', 'info@solmantec.it', '12632850017', ''),
	(66, 18, 1, 'Errecinque', 'Volpiano', 'via brandizzo 176', '10088', '011 9881833', 'info@errecinque.it', '02392710014', ''),
	(67, 18, 1, 'F.lli Chiaramello trasporti', 'Torino', 'c.so Francia 17', '10138', '', '', '12273890017', ''),
	(68, 18, 1, 'Easytec', 'Scalenghe TO', 'Via Agnelli Senatore Avvocato Giovanni, 6', '10060', '0119866372', 'info@easytec.it', '11175170015', '');

-- Dump della struttura di tabella gestionale_vba.orders
CREATE TABLE IF NOT EXISTS `orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `manager` int(11) NOT NULL,
  `customer` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `status` int(11) NOT NULL,
  `type` int(11) NOT NULL,
  `start_date` varchar(255) NOT NULL,
  `end_date` varchar(255) DEFAULT NULL,
  `note` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_orders_users` (`manager`),
  KEY `FK_orders_customers_suppliers` (`customer`),
  KEY `FK_orders_orders_status` (`status`),
  KEY `FK_orders_orders_types` (`type`),
  CONSTRAINT `FK_orders_customers_suppliers` FOREIGN KEY (`customer`) REFERENCES `customers_suppliers` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_orders_orders_status` FOREIGN KEY (`status`) REFERENCES `orders_status` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_orders_orders_types` FOREIGN KEY (`type`) REFERENCES `orders_types` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_orders_users` FOREIGN KEY (`manager`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dump dei dati della tabella gestionale_vba.orders: ~0 rows (circa)

-- Dump della struttura di tabella gestionale_vba.orders_status
CREATE TABLE IF NOT EXISTS `orders_status` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dump dei dati della tabella gestionale_vba.orders_status: ~0 rows (circa)

-- Dump della struttura di tabella gestionale_vba.orders_types
CREATE TABLE IF NOT EXISTS `orders_types` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dump dei dati della tabella gestionale_vba.orders_types: ~0 rows (circa)

-- Dump della struttura di tabella gestionale_vba.resources_function
CREATE TABLE IF NOT EXISTS `resources_function` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dump dei dati della tabella gestionale_vba.resources_function: ~3 rows (circa)
INSERT INTO `resources_function` (`id`, `name`) VALUES
	(1, 'Cliente'),
	(2, 'Cliente / Fornitore'),
	(3, 'Fornitore');

-- Dump della struttura di tabella gestionale_vba.resources_type
CREATE TABLE IF NOT EXISTS `resources_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `note` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dump dei dati della tabella gestionale_vba.resources_type: ~2 rows (circa)
INSERT INTO `resources_type` (`id`, `name`, `description`, `note`) VALUES
	(18, 'Generico', '', ''),
	(29, 'Grossista Elettrico', '', '');

-- Dump della struttura di tabella gestionale_vba.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `lastname` varchar(255) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dump dei dati della tabella gestionale_vba.users: ~2 rows (circa)
INSERT INTO `users` (`id`, `lastname`, `firstname`, `username`, `email`, `phone_number`, `password`) VALUES
	(30, 'Rosso', 'Simone', 'simone', 'simone@gmail.com', '0', '$2b$10$ZWYnayjfUBHaqhk/bcKVl.KXt5atQnziklCSApOSnKNrJ9qnz9Tli'),
	(31, 'Visca', 'Matteo', 'matteo', 'matteo@gmail.com', 'dsa', '$2b$10$GjNLRaNmBbUpxLYUl9isSeZ4yGYD1Qe6a3KbYEdD9RcBY0CO5bG/a');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
