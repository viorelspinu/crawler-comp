CREATE DATABASE  IF NOT EXISTS `crawler_db` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `crawler_db`;
-- MySQL dump 10.13  Distrib 5.7.21, for Linux (x86_64)
--
-- Host: prod.cwpbzfdpgbc8.us-east-1.rds.amazonaws.com    Database: crawler_db
-- ------------------------------------------------------
-- Server version	5.6.37-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `pilot`
--

DROP TABLE IF EXISTS `pilot`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pilot` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `tournament_id` int(6) DEFAULT NULL,
  `last_race_index` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=141 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pilot`
--

LOCK TABLES `pilot` WRITE;
/*!40000 ALTER TABLE `pilot` DISABLE KEYS */;
INSERT INTO `pilot` VALUES (131,'Ana Spinu',71,4),(132,'Ana Spinu',72,2),(133,'Cristi Marin',72,2),(134,'Adrian Valeanu',72,2),(135,'Mihaela ',72,2),(136,'Ciprian',72,2),(137,'George Cirlescu',72,2),(138,'Costi',72,1),(139,'Viorel Spinu',72,2),(140,'Dan Gigi',72,2);
/*!40000 ALTER TABLE `pilot` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `race_event`
--

DROP TABLE IF EXISTS `race_event`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `race_event` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `tournament_id` int(11) DEFAULT NULL,
  `pilot_id` int(11) DEFAULT NULL,
  `race_event_type_id` int(11) DEFAULT NULL,
  `race_index` int(11) DEFAULT NULL,
  `seconds` int(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1484 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `race_event`
--

LOCK TABLES `race_event` WRITE;
/*!40000 ALTER TABLE `race_event` DISABLE KEYS */;
INSERT INTO `race_event` VALUES (1335,72,132,3,1,237),(1336,72,132,3,1,299),(1337,72,132,6,1,300),(1338,72,136,1,1,24),(1339,72,136,3,1,38),(1340,72,136,1,1,42),(1341,72,136,1,1,45),(1342,72,136,1,1,71),(1343,72,136,1,1,89),(1344,72,136,2,1,102),(1345,72,136,1,1,118),(1346,72,136,1,1,135),(1347,72,136,1,1,185),(1348,72,136,1,1,189),(1349,72,136,6,1,222),(1350,72,135,1,1,49),(1351,72,135,2,1,65),(1352,72,135,3,1,111),(1353,72,135,1,1,156),(1354,72,135,2,1,176),(1355,72,135,4,1,236),(1356,72,135,4,1,253),(1357,72,135,2,1,267),(1358,72,135,5,1,271),(1359,72,135,1,1,305),(1360,72,135,1,1,309),(1361,72,135,1,1,349),(1362,72,135,1,1,383),(1363,72,135,1,1,395),(1364,72,135,3,1,403),(1365,72,135,1,1,420),(1366,72,135,6,1,421),(1367,72,137,1,1,113),(1368,72,137,1,1,130),(1369,72,137,2,1,134),(1370,72,137,6,1,215),(1371,72,134,1,1,34),(1372,72,134,2,1,68),(1373,72,134,1,1,87),(1374,72,134,3,1,138),(1375,72,134,3,1,166),(1376,72,133,2,1,22),(1377,72,133,1,1,70),(1378,72,133,3,1,72),(1379,72,133,1,1,136),(1380,72,133,6,1,221),(1381,72,140,1,1,21),(1382,72,140,3,1,38),(1383,72,140,1,1,46),(1384,72,140,3,1,64),(1385,72,140,3,1,77),(1386,72,140,2,1,78),(1387,72,140,3,1,94),(1388,72,140,5,1,98),(1389,72,140,1,1,144),(1390,72,140,1,1,145),(1391,72,139,1,1,49),(1392,72,139,3,1,62),(1393,72,139,1,1,103),(1394,72,139,3,1,112),(1395,72,139,1,1,133),(1396,72,139,3,1,136),(1397,72,139,3,1,143),(1398,72,135,1,2,38),(1399,72,135,3,2,68),(1400,72,135,2,2,94),(1401,72,135,3,2,151),(1402,72,135,3,2,175),(1403,72,135,1,2,383),(1404,72,135,1,2,418),(1405,72,135,1,2,419),(1406,72,135,1,2,439),(1407,72,135,1,2,470),(1408,72,135,3,2,483),(1409,72,135,6,2,484),(1410,72,132,3,2,20),(1411,72,132,2,2,60),(1412,72,132,3,2,160),(1413,72,132,3,2,201),(1414,72,132,3,2,260),(1415,72,132,6,2,262),(1416,72,136,4,2,35),(1417,72,136,1,2,42),(1418,72,136,3,2,60),(1419,72,136,1,2,115),(1420,72,136,1,2,160),(1421,72,136,1,2,168),(1422,72,136,3,2,174),(1423,72,136,4,2,179),(1424,72,136,2,2,192),(1425,72,136,1,2,238),(1426,72,136,6,2,276),(1427,72,137,3,2,9),(1428,72,137,2,2,27),(1429,72,137,1,2,59),(1430,72,137,1,2,99),(1431,72,137,1,2,132),(1432,72,137,1,2,151),(1433,72,137,1,2,154),(1434,72,137,1,2,162),(1435,72,137,6,2,225),(1436,72,138,2,1,53),(1437,72,138,2,1,69),(1438,72,138,4,1,105),(1439,72,138,3,1,112),(1440,72,138,3,1,147),(1441,72,138,2,1,183),(1442,72,138,5,1,188),(1443,72,138,2,1,193),(1444,72,138,2,1,202),(1445,72,138,2,1,210),(1446,72,138,1,1,285),(1447,72,138,3,1,300),(1448,72,138,6,1,302),(1449,72,133,2,2,40),(1450,72,133,1,2,56),(1451,72,133,1,2,101),(1452,72,133,1,2,147),(1453,72,133,1,2,150),(1454,72,133,1,2,168),(1455,72,133,1,2,168),(1456,72,133,3,2,223),(1457,72,133,4,2,239),(1458,72,133,5,2,245),(1459,72,133,6,2,259),(1460,72,134,2,2,25),(1461,72,134,1,2,31),(1462,72,134,2,2,39),(1463,72,134,1,2,63),(1464,72,134,3,2,71),(1465,72,134,1,2,75),(1466,72,134,2,2,84),(1467,72,134,3,2,148),(1468,72,134,6,2,205),(1469,72,140,2,2,15),(1470,72,140,3,2,23),(1471,72,140,3,2,59),(1472,72,140,2,2,65),(1473,72,140,1,2,82),(1474,72,140,2,2,86),(1475,72,140,2,2,92),(1476,72,140,3,2,94),(1477,72,139,1,2,57),(1478,72,139,3,2,74),(1479,72,139,1,2,91),(1480,72,139,1,2,96),(1481,72,139,1,2,150),(1482,72,139,2,2,155),(1483,72,139,3,2,159);
/*!40000 ALTER TABLE `race_event` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `race_event_type`
--

DROP TABLE IF EXISTS `race_event_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `race_event_type` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `points` int(3) DEFAULT NULL,
  `automatic` tinyint(1) DEFAULT NULL,
  `code` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `race_event_type`
--

LOCK TABLES `race_event_type` WRITE;
/*!40000 ALTER TABLE `race_event_type` DISABLE KEYS */;
INSERT INTO `race_event_type` VALUES (1,'reverse',1,0,NULL),(2,'rollover',5,0,NULL),(3,'gate',5,0,NULL),(4,'hand touch',5,0,NULL),(5,'reposition',10,0,NULL),(6,'overtime',5,1,'TIME_EVENT');
/*!40000 ALTER TABLE `race_event_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tournament`
--

DROP TABLE IF EXISTS `tournament`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tournament` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `create_date` timestamp NULL DEFAULT NULL,
  `finished` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=73 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tournament`
--

LOCK TABLES `tournament` WRITE;
/*!40000 ALTER TABLE `tournament` DISABLE KEYS */;
INSERT INTO `tournament` VALUES (71,'Bucuresti 13 Mai 2018 - Training','2018-05-12 18:31:18',1),(72,'Bucuresti 13 Mai 2018 - For Real','2018-05-12 18:31:37',1);
/*!40000 ALTER TABLE `tournament` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-05-14 10:47:39
