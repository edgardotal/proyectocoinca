-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 09-09-2024 a las 09:10:51
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `bdcoinca`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cavas`
--

CREATE TABLE `cavas` (
  `id` int(11) NOT NULL,
  `estatus` varchar(50) DEFAULT NULL,
  `c_grado` decimal(5,2) DEFAULT NULL,
  `servicio` varchar(100) DEFAULT NULL,
  `capacidad_total` decimal(10,2) DEFAULT NULL,
  `capacidad_operativa` decimal(10,2) DEFAULT NULL,
  `ocupado` decimal(10,2) DEFAULT NULL,
  `disponible` decimal(10,2) DEFAULT NULL,
  `porcentaje_ocupacion` decimal(5,2) DEFAULT NULL,
  `observacion` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
  `id` int(11) NOT NULL,
  `codigo` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `fechaurecepcion` date DEFAULT NULL,
  `fechauentrega` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`id`, `codigo`, `nombre`, `fechaurecepcion`, `fechauentrega`) VALUES
(1, 1, 'Pedro Rodriguez', NULL, NULL),
(2, 2, 'Edgardo Talavera', NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `distribucion`
--

CREATE TABLE `distribucion` (
  `id_cava` varchar(1) NOT NULL,
  `nombre` varchar(20) NOT NULL,
  `capacidad` int(224) NOT NULL,
  `filas` int(28) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `filas`
--

CREATE TABLE `filas` (
  `id_fila` varchar(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `filas`
--

INSERT INTO `filas` (`id_fila`) VALUES
('f1');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inv_cli`
--

CREATE TABLE `inv_cli` (
  `id` int(11) NOT NULL,
  `codigo_cliente` varchar(50) DEFAULT NULL,
  `nombre_cliente` varchar(100) DEFAULT NULL,
  `producto` varchar(100) DEFAULT NULL,
  `umb` varchar(10) DEFAULT NULL,
  `disponible` int(11) DEFAULT NULL,
  `no_conforme` decimal(10,2) DEFAULT NULL,
  `total` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `numero_control`
--

CREATE TABLE `numero_control` (
  `ncontrolrecep` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `numero_control`
--

INSERT INTO `numero_control` (`ncontrolrecep`) VALUES
(1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

CREATE TABLE `producto` (
  `id` int(11) NOT NULL,
  `codigo` varchar(8) NOT NULL,
  `descripcion` varchar(50) DEFAULT NULL,
  `unidad` int(11) DEFAULT NULL,
  `bultos` int(11) DEFAULT NULL,
  `cantidad` decimal(10,2) DEFAULT 0.00
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `producto`
--

INSERT INTO `producto` (`id`, `codigo`, `descripcion`, `unidad`, `bultos`, `cantidad`) VALUES
(1, '260114', 'Alas de Pollo (Emp. 5 Kg)\r', NULL, NULL, 0.00),
(2, '260323', 'Alas de Pollo a Granel\r', NULL, NULL, 0.00),
(3, '260387', 'Alas de Pollo Kiri (Bandeja)\r', NULL, NULL, 0.00),
(4, '260211', 'Alas de Pollo Recao (Bandeja)\r', NULL, NULL, 0.00),
(5, '230003', 'Asaduras de Cerdo\r', NULL, NULL, 0.00),
(6, '260260', 'Avican\r', NULL, NULL, 0.00),
(7, '260347', 'Avican Granel\r', NULL, NULL, 0.00),
(8, '230006', 'Ba?a de Cerdo\r', NULL, NULL, 0.00),
(9, '230001', 'Cabeza de Cerdo\r', NULL, NULL, 0.00),
(10, '260023', 'Cabeza de Pollo Granel\r', NULL, NULL, 0.00),
(11, '260072', 'Carcasa de Pollo Granel\r', NULL, NULL, 0.00),
(12, '230064', 'Careta de Cerdo\r', NULL, NULL, 0.00),
(13, '270056', 'Carne de Hamb. Cerdo 125 G Recao (4 Und)\r', NULL, NULL, 0.00),
(14, '270055', 'Carne de Hamb. Pollo 125 G Recao (4 Und)\r', NULL, NULL, 0.00),
(15, '270027', 'Carne de Hamburguesa de Cerdo Recao 125G\r', NULL, NULL, 0.00),
(16, '270026', 'Carne de Hamburguesa de Pollo Recao 125G\r', NULL, NULL, 0.00),
(17, '260251', 'Carne Deshuesada Mecanicamente (CDM)\r', NULL, NULL, 0.00),
(18, '260313', 'Carne Deshuesada Mecanicamente A Granel\r', NULL, NULL, 0.00),
(19, '260314', 'Carne Deshuesada Mecanicamente B Granel\r', NULL, NULL, 0.00),
(20, '260315', 'Carne Deshuesada Mecanicamente C Granel\r', NULL, NULL, 0.00),
(21, '260280', 'Carne Molida de Pollo (Bandeja)\r', NULL, NULL, 0.00),
(22, '200015', 'Carton de Huevos Averiados\r', NULL, NULL, 0.00),
(23, '200022', 'Carton de Huevos Blancos Fertil\r', NULL, NULL, 0.00),
(24, '200017', 'Carton de Huevos Extra Grande\r', NULL, NULL, 0.00),
(25, '200014', 'Carton de Huevos Grandes\r', NULL, NULL, 0.00),
(26, '200021', 'Carton de Huevos Medianos\r', NULL, NULL, 0.00),
(27, '200016', 'Carton de Huevos Sucios\r', NULL, NULL, 0.00),
(28, '230052', 'Cerda Madre Pelada en Canal\r', NULL, NULL, 0.00),
(29, '230053', 'Cerdo Madre Tipo Lechon en Canal\r', NULL, NULL, 0.00),
(30, '230054', 'Cerdo Padrote Pelado en Canal\r', NULL, NULL, 0.00),
(31, '230055', 'Cerdo Padrote Tipo Lechon en Canal\r', NULL, NULL, 0.00),
(32, '230000', 'Cerdo Pelado en Canal\r', NULL, NULL, 0.00),
(33, '500241', 'CESTAS GRANDES TARA 2.2\r', NULL, NULL, 0.00),
(34, '500244', 'CESTAS LECHERAS\r', NULL, NULL, 0.00),
(35, '500242', 'CESTAS MEDIANAS TARA 2.3\r', NULL, NULL, 0.00),
(36, '500243', 'CESTAS PEQUE?AS 1.5\r', NULL, NULL, 0.00),
(37, '270042', 'Chorizo Carupanero Recao\r', NULL, NULL, 0.00),
(38, '270041', 'Chorizo Cervecero Recao\r', NULL, NULL, 0.00),
(39, '270067', 'Chorizo de Carupanero Recao (5 Und)\r', NULL, NULL, 0.00),
(40, '270025', 'Chorizo de Cerdo Recao\r', NULL, NULL, 0.00),
(41, '270065', 'Chorizo de Cerdo Recao (5 Und)\r', NULL, NULL, 0.00),
(42, '270066', 'Chorizo de Cervecero Recao (5 Und)\r', NULL, NULL, 0.00),
(43, '270068', 'Chorizo de Menudo Recao (5 Und)\r', NULL, NULL, 0.00),
(44, '270043', 'Chorizo de Menudos Recao\r', NULL, NULL, 0.00),
(45, '270024', 'Chorizo de Pollo Recao\r', NULL, NULL, 0.00),
(46, '270064', 'Chorizo de Pollo Recao (5 Und)\r', NULL, NULL, 0.00),
(47, '230013', 'Chuleta de Cerdo\r', NULL, NULL, 0.00),
(48, '260121', 'Churrasco de Muslo de Pollo (Emp. 5 Kg)\r', NULL, NULL, 0.00),
(49, '260081', 'Churrasco de Muslo de Pollo (NO USAR)\r', NULL, NULL, 0.00),
(50, '260117', 'Churrasco de Pechuga de Pollo (Emp 5 Kg)\r', NULL, NULL, 0.00),
(51, '260071', 'Churrasco de Pechuga de Pollo (NO USAR)\r', NULL, NULL, 0.00),
(52, '260385', 'Churrasco Muslo de Pollo Kiri (Bandeja)\r', NULL, NULL, 0.00),
(53, '260209', 'Churrasco Muslo de Pollo Recao (Bandeja)\r', NULL, NULL, 0.00),
(54, '260384', 'Churrasco Pechuga Pollo Kiri (Bandeja)\r', NULL, NULL, 0.00),
(55, '260203', 'Churrasco Pechuga Pollo Recao (Bandeja)\r', NULL, NULL, 0.00),
(56, '260205', 'Contra Pierna de Pollo (Bandeja)\r', NULL, NULL, 0.00),
(57, '260109', 'Contra Pierna de Pollo (Emp. 5 Kg)\r', NULL, NULL, 0.00),
(58, '260108', 'Contra Pierna de Pollo (NO USAR)\r', NULL, NULL, 0.00),
(59, '260420', 'Contra Pierna de Pollo Granel\r', NULL, NULL, 0.00),
(60, '230041', 'Coppa de Cerdo\r', NULL, NULL, 0.00),
(61, '260124', 'Coraz?n de Pollo\r', NULL, NULL, 0.00),
(62, '230011', 'Costilla China de Cerdo\r', NULL, NULL, 0.00),
(63, '230023', 'Costilla de Cerdo Baby Bat\r', NULL, NULL, 0.00),
(64, '230021', 'Costilla de Cerdo con Carne\r', NULL, NULL, 0.00),
(65, '290001', 'Crema de Leche\r', NULL, NULL, 0.00),
(66, '260063', 'Cuello de Pollo\r', NULL, NULL, 0.00),
(67, '260116', 'Cuello de Pollo Granel\r', NULL, NULL, 0.00),
(68, '230004', 'Cuero de Cerdo\r', NULL, NULL, 0.00),
(69, '230032', 'Cuero Tallado\r', NULL, NULL, 0.00),
(70, '270081', 'Desperdicio de Pasta\r', NULL, NULL, 0.00),
(71, '260040', 'Desperdicio de Pollo Granel\r', NULL, NULL, 0.00),
(72, '270080', 'Desperdicio Tipo Aserr?n\r', NULL, NULL, 0.00),
(73, '230020', 'Desperdicios de Cerdo\r', NULL, NULL, 0.00),
(74, '200040', 'Disponible\r', NULL, NULL, 0.00),
(75, '200083', 'Disponible\r', NULL, NULL, 0.00),
(76, '270082', 'Espalda Ahumada de Cerdo Est.Recao 4', NULL, NULL, 0.00),
(77, '270017', 'Espalda Cocida Cerdo Est. Recao 4', NULL, NULL, 0.00),
(78, '270061', 'Espalda Cocida Cerdo Est.Recao 4', NULL, NULL, 0.00),
(79, '260281', 'Espinazo de Pollo\r', NULL, NULL, 0.00),
(80, '200020', 'Est. Plast. Hvos. Medianos (12 Unds)\r', NULL, NULL, 0.00),
(81, '200018', 'Est. Plast. Hvos. Medianos (15 Unds)\r', NULL, NULL, 0.00),
(82, '200140', 'Est. Pulpa 6x6 Hvos Medianos (12 unds)\r', NULL, NULL, 0.00),
(83, '200019', 'Est. Pulpa Hvos. Medianos (12 Unds)\r', NULL, NULL, 0.00),
(84, '260452', 'Filet de Gallina\r', NULL, NULL, 0.00),
(85, '260120', 'Filet de Muslo de Pollo (Emp. 5 Kg)\r', NULL, NULL, 0.00),
(86, '260080', 'Filet de Muslo de Pollo (NO USAR)\r', NULL, NULL, 0.00),
(87, '260383', 'Filet de Muslo de Pollo Kiri (Bandeja)\r', NULL, NULL, 0.00),
(88, '260208', 'Filet de Muslo de Pollo Recao (Bandeja)\r', NULL, NULL, 0.00),
(89, '260405', 'Filet de Pechuga de Pollo (Emp. 10 Kg)\r', NULL, NULL, 0.00),
(90, '260118', 'Filet de Pechuga de Pollo (Emp. 5 Kg)\r', NULL, NULL, 0.00),
(91, '260070', 'Filet de Pechuga de Pollo (NO USAR)\r', NULL, NULL, 0.00),
(92, '260381', 'Filet de Pechuga de Pollo Kiri (Bandeja)\r', NULL, NULL, 0.00),
(93, '260202', 'Filet de Pechuga de Pollo Recao(Bandeja)\r', NULL, NULL, 0.00),
(94, '260440', 'Filet de Pechuga Industria Granel\r', NULL, NULL, 0.00),
(95, '260375', 'Filet Pechuga de Pollo Bajo Peso (5 kg)\r', NULL, NULL, 0.00),
(96, '260374', 'Filet Pechuga de Pollo Bajo Peso Granel\r', NULL, NULL, 0.00),
(97, '260024', 'Frito Listo\r', NULL, NULL, 0.00),
(98, '260343', 'Gallina Benef. Grado B Pesada Granel\r', NULL, NULL, 0.00),
(99, '260401', 'Gallina Beneficiada Grado A Liv.\r', NULL, NULL, 0.00),
(100, '260400', 'Gallina Beneficiada Grado A Liv. Granel\r', NULL, NULL, 0.00),
(101, '260345', 'Gallina Beneficiada Grado A Pes. Granel\r', NULL, NULL, 0.00),
(102, '260340', 'Gallina Beneficiada Grado A Pesada\r', NULL, NULL, 0.00),
(103, '260344', 'Gallina Beneficiada Grado B Liv. Granel\r', NULL, NULL, 0.00),
(104, '260300', 'Gallina Beneficiada Liviana Trozada\r', NULL, NULL, 0.00),
(105, '260250', 'Gallina Beneficiada Pesada Despresada\r', NULL, NULL, 0.00),
(106, '260342', 'Gallo Beneficiado Grado A\r', NULL, NULL, 0.00),
(107, '260180', 'Gallo Beneficiado Grado B Granel\r', NULL, NULL, 0.00),
(108, '260290', 'Gallo Pesado Despresado\r', NULL, NULL, 0.00),
(109, '230031', 'Grasa de Cerdo\r', NULL, NULL, 0.00),
(110, '260110', 'Grasa de Pollo Granel\r', NULL, NULL, 0.00),
(111, '260027', 'Higado de Pollo Empacado\r', NULL, NULL, 0.00),
(112, '260100', 'Higado de Pollo Granel\r', NULL, NULL, 0.00),
(113, '230015', 'Hueso Blanco de Cerdo\r', NULL, NULL, 0.00),
(114, '230016', 'Hueso Coppa de Cerdo\r', NULL, NULL, 0.00),
(115, '230024', 'Hueso Vertebra de Cerdo\r', NULL, NULL, 0.00),
(116, '200023', 'Huevo Fertil (Cajas)\r', NULL, NULL, 0.00),
(117, '200025', 'Huevo Fertil (Comprado Imp.)\r', NULL, NULL, 0.00),
(118, '200024', 'Huevo Fertil (Comprado Nac.)\r', NULL, NULL, 0.00),
(119, '200060', 'Huevo Fertil Comercial A\r', NULL, NULL, 0.00),
(120, '200081', 'Huevo Fertil Comercial AA\r', NULL, NULL, 0.00),
(121, '200101', 'Huevo Fertil Comercial Averiados\r', NULL, NULL, 0.00),
(122, '200102', 'Huevo Fertil Comercial Blancos\r', NULL, NULL, 0.00),
(123, '200082', 'Huevo Fertil Comercial Peque?os\r', NULL, NULL, 0.00),
(124, '200100', 'Huevo Fertil Comercial Sucios\r', NULL, NULL, 0.00),
(125, '200026', 'Huevo Fertil Incubable\r', NULL, NULL, 0.00),
(126, '200011', 'Huevo Jumbo\r', NULL, NULL, 0.00),
(127, '200006', 'Huevos Averiados\r', NULL, NULL, 0.00),
(128, '200010', 'Huevos Blancos\r', NULL, NULL, 0.00),
(129, '200041', 'Huevos Est. Pulpa. (12 Unds) (S/I)\r', NULL, NULL, 0.00),
(130, '200002', 'Huevos Estuchados de Pulpa x 12\r', NULL, NULL, 0.00),
(131, '200130', 'Huevos Estuchados de Pulpa x 6\r', NULL, NULL, 0.00),
(132, '200007', 'Huevos Estuchados Pl?sticos x 12\r', NULL, NULL, 0.00),
(133, '200003', 'Huevos Estuchados Pl?sticos x 15\r', NULL, NULL, 0.00),
(134, '200080', 'Huevos Fertil Comercial Jumbo\r', NULL, NULL, 0.00),
(135, '200072', 'Huevos Liquidos 1 Kg\r', NULL, NULL, 0.00),
(136, '200008', 'Huevos Med. Est. pulpa (300 Unds)\r', NULL, NULL, 0.00),
(137, '200001', 'Huevos Medianos\r', NULL, NULL, 0.00),
(138, '200004', 'Huevos Peque?os\r', NULL, NULL, 0.00),
(139, '200005', 'Huevos Pewee\r', NULL, NULL, 0.00),
(140, '200009', 'Huevos Sucios\r', NULL, NULL, 0.00),
(141, '200050', 'Huevos Tipo A\r', NULL, NULL, 0.00),
(142, '200012', 'Huevos Tipo AA\r', NULL, NULL, 0.00),
(143, '200151', 'Huevos Tipo Extra\r', NULL, NULL, 0.00),
(144, '270084', 'Jam?n de Pechuga de Pollo Sup.Recao 1 Kg\r', NULL, NULL, 0.00),
(145, '270123', 'Jam?n de Pechuga Pollo Sup.Recao 800 gr\r', NULL, NULL, 0.00),
(146, '270140', 'Jam?n de Pollo Est.Recao (800 gr) Gr ?B?\r', NULL, NULL, 0.00),
(147, '270180', 'Jam?n de pollo est?ndar fulete 1kg\r', NULL, NULL, 0.00),
(148, '270181', 'Jam?n de pollo est?ndar fulete 1kg B\r', NULL, NULL, 0.00),
(149, '270131', 'Jam?n de Pollo Estandar Recao (400 gr)\r', NULL, NULL, 0.00),
(150, '270130', 'Jam?n de Pollo Estandar Recao (800 gr)\r', NULL, NULL, 0.00),
(151, '270018', 'Jam?n de Pollo Estandar Recao 4', NULL, NULL, 0.00),
(152, '270057', 'Jam?n de Pollo Estandar Recao 4', NULL, NULL, 0.00),
(153, '270004', 'Jam?n Pechuga de Pollo Sup.Recao 4', NULL, NULL, 0.00),
(154, '270019', 'Jam?n Pechuga Pollo Ahu. Sup.Recao 4', NULL, NULL, 0.00),
(155, '270059', 'Jam?n Pechuga Pollo Ahu. Sup.Recao 4', NULL, NULL, 0.00),
(156, '270058', 'Jam?n Pechuga Pollo Sup.Recao 4', NULL, NULL, 0.00),
(157, '270124', 'Jam?n Pechuga Pollo Sup.Recao 800gr ?B?\r', NULL, NULL, 0.00),
(158, '270016', 'Jam?n Pierna de Cerdo Sup.Recao 5', NULL, NULL, 0.00),
(159, '270060', 'Jam?n Pierna de Cerdo Sup.Recao 5', NULL, NULL, 0.00),
(160, '270063', 'Jam?n Tender Sup.Recao (1 Kg)\r', NULL, NULL, 0.00),
(161, '270150', 'Jam?n Tender Sup.Recao (1 Kg) Empacado\r', NULL, NULL, 0.00),
(162, '270062', 'Jam?n Tender Sup.Recao (500 G)\r', NULL, NULL, 0.00),
(163, '270046', 'Jam?n Tender Superior Recao (1 Kg)\r', NULL, NULL, 0.00),
(164, '270044', 'Jam?n Tender superior Recao (500 G)\r', NULL, NULL, 0.00),
(165, '230040', 'Lengua de Cerdo\r', NULL, NULL, 0.00),
(166, '230014', 'Lomito de Cerdo\r', NULL, NULL, 0.00),
(167, '230022', 'Lomo de Cerdo\r', NULL, NULL, 0.00),
(168, '270085', 'Medallones de Pollo Kiri (Bandeja)\r', NULL, NULL, 0.00),
(169, '260373', 'Milanesa de Pechuga de Pollo\r', NULL, NULL, 0.00),
(170, '260370', 'Milanesa de Pechuga de Pollo (Emp. 5 Kg)\r', NULL, NULL, 0.00),
(171, '260330', 'Milanesa de Pechuga de Pollo Granel\r', NULL, NULL, 0.00),
(172, '260386', 'Milanesa Pechuga de Pollo Kiri (Bandeja)\r', NULL, NULL, 0.00),
(173, '260371', 'Milanesa Pechuga de Pollo Recao(Bandeja)\r', NULL, NULL, 0.00),
(174, '260030', 'Molleja de Pollo Empacada\r', NULL, NULL, 0.00),
(175, '260026', 'Molleja de Pollo Granel\r', NULL, NULL, 0.00),
(176, '270083', 'Mortadela de Cerdo Tapara Recao (4', NULL, NULL, 0.00),
(177, '270014', 'Mortadela de Pollo Esp Kiri (1 Kg) 1x12\r', NULL, NULL, 0.00),
(178, '270110', 'Mortadela de Pollo Esp.Kiri Grado B 1X12\r', NULL, NULL, 0.00),
(179, '270111', 'Mortadela de Pollo Esp.Kiri Grado B 1X12\r', NULL, NULL, 0.00),
(180, '270182', 'Mortadela de pollo especial fulete 1kg\r', NULL, NULL, 0.00),
(181, '270183', 'Mortadela de pollo especial fulete 1kg B\r', NULL, NULL, 0.00),
(182, '270091', 'Mortadela de Pollo Especial Grado B 1Kg\r', NULL, NULL, 0.00),
(183, '270012', 'Mortadela de Pollo Especial Kiri (1 Kg)\r', NULL, NULL, 0.00),
(184, '270089', 'Mortadela de Pollo Especial Kiri 1X12\r', NULL, NULL, 0.00),
(185, '270003', 'Mortadela de Pollo Grado B (1 Kg)\r', NULL, NULL, 0.00),
(186, '270050', 'Mortadela de Pollo Grado B (1 Kg) 1x12\r', NULL, NULL, 0.00),
(187, '270013', 'Mortadela de Pollo Recao (1 Kg)\r', NULL, NULL, 0.00),
(188, '270015', 'Mortadela de Pollo Recao (1Kg) 1x12\r', NULL, NULL, 0.00),
(189, '270040', 'Mortadela de Pollo Recao (500 G)\r', NULL, NULL, 0.00),
(190, '270045', 'Mortadela de Pollo Recao (500 G) 1x24\r', NULL, NULL, 0.00),
(191, '270161', 'Mortadela de Pollo Recao (500 G) B\r', NULL, NULL, 0.00),
(192, '270162', 'Mortadela de Pollo Recao (500 G) B 1x24\r', NULL, NULL, 0.00),
(193, '260264', 'Mortadela de Pollo Superior (No Usar)\r', NULL, NULL, 0.00),
(194, '270000', 'Mortadela de Pollo Superior (No Usar)\r', NULL, NULL, 0.00),
(195, '270001', 'Mortadela de Pollo Superior (No Usar)\r', NULL, NULL, 0.00),
(196, '270170', 'Mortadela Sup tipo Tapara con Pistacho\r', NULL, NULL, 0.00),
(197, '270172', 'Mortadela Sup Tipos Tapara con Pstacho B\r', NULL, NULL, 0.00),
(198, '270020', 'Mortadelita de Cerdo Sup.Recao\r', NULL, NULL, 0.00),
(199, '270022', 'Mortadelita de Cerdo Sup.Recao 100 unid.\r', NULL, NULL, 0.00),
(200, '270054', 'Mortadelita de Pollo Sup.Recao 100 und.\r', NULL, NULL, 0.00),
(201, '270100', 'Mortadelita de Pollo Sup.Recao B (1kg)\r', NULL, NULL, 0.00),
(202, '270053', 'Mortadelita de Pollo Superior Recao\r', NULL, NULL, 0.00),
(203, '260212', 'Muslito de alas de Pollo (Bandeja)\r', NULL, NULL, 0.00),
(204, '260107', 'Muslito de alas de Pollo (Emp. 5 Kg)\r', NULL, NULL, 0.00),
(205, '260105', 'Muslito de alas de Pollo (NO USAR)\r', NULL, NULL, 0.00),
(206, '260204', 'Muslo de Pollo con Espinazo (Bandeja)\r', NULL, NULL, 0.00),
(207, '260115', 'Muslo de Pollo con Espinazo (Emp. 5 Kg)\r', NULL, NULL, 0.00),
(208, '260061', 'Muslo de Pollo con Espinazo (NO USAR)\r', NULL, NULL, 0.00),
(209, '260320', 'Muslo de Pollo con Espinazo Granel\r', NULL, NULL, 0.00),
(210, '260240', 'No usar\r', NULL, NULL, 0.00),
(211, '260242', 'No usar\r', NULL, NULL, 0.00),
(212, '260214', 'No Usar\r', NULL, NULL, 0.00),
(213, '260220', 'No Usar\r', NULL, NULL, 0.00),
(214, '270011', 'No Usar\r', NULL, NULL, 0.00),
(215, '230063', 'Oreja de Cerdo\r', NULL, NULL, 0.00),
(216, '230025', 'Paleta de Cerdo\r', NULL, NULL, 0.00),
(217, '230019', 'Papada de Cerdo\r', NULL, NULL, 0.00),
(218, '230002', 'Patas de Cerdo\r', NULL, NULL, 0.00),
(219, '260411', 'Patas de Pollo (Emp. 8kg)\r', NULL, NULL, 0.00),
(220, '260073', 'Patas de Pollo Granel\r', NULL, NULL, 0.00),
(221, '260113', 'Pechuga de Pollo con Esp. (Emp. 5 Kg)\r', NULL, NULL, 0.00),
(222, '260200', 'Pechuga de Pollo con Espinazo (Bandeja)\r', NULL, NULL, 0.00),
(223, '260060', 'Pechuga de Pollo con Espinazo (NO USAR)\r', NULL, NULL, 0.00),
(224, '260322', 'Pechuga de Pollo con Espinazo Granel\r', NULL, NULL, 0.00),
(225, '260201', 'Pechuga de Pollo sin Espinazo (Bandeja)\r', NULL, NULL, 0.00),
(226, '260119', 'Pechuga de Pollo sin Espinazo (Emp 5 Kg)\r', NULL, NULL, 0.00),
(227, '260074', 'Pechuga de Pollo sin Espinazo (NO USAR)\r', NULL, NULL, 0.00),
(228, '230026', 'Pernil de Cerdo\r', NULL, NULL, 0.00),
(229, '260111', 'Piel de Pollo Granel\r', NULL, NULL, 0.00),
(230, '260206', 'Pierna de Pollo (Bandeja)\r', NULL, NULL, 0.00),
(231, '260103', 'Pierna de Pollo (Emp. 5 Kg)\r', NULL, NULL, 0.00),
(232, '260101', 'Pierna de Pollo (NO USAR)\r', NULL, NULL, 0.00),
(233, '260351', 'Plumas Granel\r', NULL, NULL, 0.00),
(234, '260421', 'Pollo Beneficiado Avicri Grado A\r', NULL, NULL, 0.00),
(235, '260460', 'Pollo Beneficiado Grado A  Kcarea\r', NULL, NULL, 0.00),
(236, '260031', 'Pollo Beneficiado Grado A Granel\r', NULL, NULL, 0.00),
(237, '260380', 'Pollo Beneficiado Grado A Kiri\r', NULL, NULL, 0.00),
(238, '260011', 'Pollo Beneficiado Grado A Recao\r', NULL, NULL, 0.00),
(239, '260020', 'Pollo Beneficiado Grado B\r', NULL, NULL, 0.00),
(240, '260050', 'Pollo Beneficiado Grado B Granel\r', NULL, NULL, 0.00),
(241, '260022', 'Pollo Beneficiado Grado C\r', NULL, NULL, 0.00),
(242, '260051', 'Pollo Beneficiado Grado C Granel\r', NULL, NULL, 0.00),
(243, '260360', 'Pollo Beneficiado Tipo Parrillero\r', NULL, NULL, 0.00),
(244, '260245', 'Pollo Consumo Animal Granel\r', NULL, NULL, 0.00),
(245, '260410', 'Pollo Empacado Grado A Recao HP\r', NULL, NULL, 0.00),
(246, '260453', 'Pollo Grado A Granel Sin Alas\r', NULL, NULL, 0.00),
(247, '260112', 'Pollo Grado C sin Pechuga Granel\r', NULL, NULL, 0.00),
(248, '260231', 'Pollo Trozado en Bandeja\r', NULL, NULL, 0.00),
(249, '260390', 'Prueba\r', NULL, NULL, 0.00),
(250, '260391', 'Prueba 2\r', NULL, NULL, 0.00),
(251, '230008', 'Pulpa de Paleta de Cerdo 86%\r', NULL, NULL, 0.00),
(252, '230033', 'Pulpa de Paleta de Cerdo 96%\r', NULL, NULL, 0.00),
(253, '230009', 'Pulpa de Pernil de Cerdo 86%\r', NULL, NULL, 0.00),
(254, '230034', 'Pulpa de Pernil de Cerdo 96%\r', NULL, NULL, 0.00),
(255, '290000', 'Queso Amarillo Gouda en Barra\r', NULL, NULL, 0.00),
(256, '290022', 'Queso Amarillo Gouda en Barra 1x4\r', NULL, NULL, 0.00),
(257, '290010', 'Queso Amarillo Gouda Redondo\r', NULL, NULL, 0.00),
(258, '290024', 'Queso Amarillo Gouda Redondo 1x12\r', NULL, NULL, 0.00),
(259, '290030', 'Queso Blanco Pasteurizado (1 kg)\r', NULL, NULL, 0.00),
(260, '290061', 'Queso en Barra Recao 1x4\r', NULL, NULL, 0.00),
(261, '290040', 'Queso Fundido Rebanable\r', NULL, NULL, 0.00),
(262, '290020', 'Queso Gouda Cuadrado (700 G)\r', NULL, NULL, 0.00),
(263, '290025', 'Queso Gouda Cuadrado (700 G) 1x12\r', NULL, NULL, 0.00),
(264, '290050', 'Queso Mozzarella en Barra\r', NULL, NULL, 0.00),
(265, '290041', 'Queso Semiduro\r', NULL, NULL, 0.00),
(266, '230030', 'Rabo de Cerdo\r', NULL, NULL, 0.00),
(267, '230012', 'Recorte de Cerdo de Primera\r', NULL, NULL, 0.00),
(268, '230018', 'Recorte de Cerdo de Segunda\r', NULL, NULL, 0.00),
(269, '260270', 'Recorte de Pollo Grado B Granel\r', NULL, NULL, 0.00),
(270, '260090', 'Recorte Filet de Pechuga de Pollo Granel\r', NULL, NULL, 0.00),
(271, '260160', 'Recorte Filet Pechuga de Pollo Emp. 5 Kg\r', NULL, NULL, 0.00),
(272, '230017', 'Recorte Rojo de Cerdo\r', NULL, NULL, 0.00),
(273, '110041', 'SACOS POLIPROPILENO SIN IMPRESION\r', NULL, NULL, 0.00),
(274, '270070', 'Salchicha de Cerdo Wiener Recao\r', NULL, NULL, 0.00),
(275, '270023', 'Salchicha de Cerdo Wiener Recao 10 unid.\r', NULL, NULL, 0.00),
(276, '270069', 'Salchicha de pollo Wiener Recao\r', NULL, NULL, 0.00),
(277, '270021', 'Salchicha de pollo Wiener Recao 10 unid.\r', NULL, NULL, 0.00),
(278, '260350', 'Sangre de Pollo Granel\r', NULL, NULL, 0.00),
(279, '290002', 'Suero\r', NULL, NULL, 0.00),
(280, '230060', 'Tocineta Ahumada\r', NULL, NULL, 0.00),
(281, '230010', 'Tocineta de Cerdo\r', NULL, NULL, 0.00),
(282, '230070', 'Tocineta de Cerdo Recao Empacado\r', NULL, NULL, 0.00),
(283, '230007', 'Tocino de Cerdo\r', NULL, NULL, 0.00),
(284, '260244', 'Visceras de Pollo Granel\r', NULL, NULL, 0.00);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `recepcion`
--

CREATE TABLE `recepcion` (
  `id` int(11) NOT NULL,
  `ncontrol` int(11) DEFAULT NULL,
  `fechar` date NOT NULL,
  `codcli` varchar(10) NOT NULL,
  `pe` int(10) DEFAULT NULL,
  `lote` varchar(50) DEFAULT NULL,
  `producto` varchar(100) DEFAULT NULL,
  `c` varchar(50) DEFAULT NULL,
  `f` varchar(50) DEFAULT NULL,
  `n` varchar(50) DEFAULT NULL,
  `bruto` decimal(10,2) DEFAULT NULL,
  `gde25` int(10) DEFAULT NULL,
  `gde24` int(10) DEFAULT NULL,
  `gde23` int(10) DEFAULT NULL,
  `gde22` int(10) DEFAULT NULL,
  `med` int(10) DEFAULT NULL,
  `peq` int(10) DEFAULT NULL,
  `est` int(10) DEFAULT NULL,
  `tara` decimal(10,2) DEFAULT NULL,
  `neto` decimal(10,2) DEFAULT NULL,
  `totcesta` int(11) DEFAULT NULL,
  `bultos` int(11) DEFAULT NULL,
  `unidad` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `recepcion`
--

INSERT INTO `recepcion` (`id`, `ncontrol`, `fechar`, `codcli`, `pe`, `lote`, `producto`, `c`, `f`, `n`, `bruto`, `gde25`, `gde24`, `gde23`, `gde22`, `med`, `peq`, `est`, `tara`, `neto`, `totcesta`, `bultos`, `unidad`) VALUES
(1, 1, '2024-09-07', 'Pedro Rodr', 1, 'wwww', 'Alas de Pollo (Emp. 5 Kg)\r', 'Cava1', 'F1', 'Nivel1', 500.00, 50, NULL, NULL, NULL, NULL, NULL, 1, 150.00, 350.00, 50, NULL, NULL),
(2, 1, '2024-09-07', 'Pedro Rodr', 1, 'wwww', 'Alas de Pollo (Emp. 5 Kg)\r', 'Cava1', 'F1', 'Nivel1', 500.00, 50, NULL, NULL, NULL, NULL, NULL, 1, 150.00, 350.00, 50, NULL, NULL),
(3, 1, '2024-09-07', 'Pedro Rodr', 1, 'wwww', 'Alas de Pollo a Granel\r', 'Cava1', 'F1', 'Nivel1', 300.00, 20, NULL, NULL, NULL, NULL, NULL, 1, 75.00, 225.00, 20, NULL, NULL),
(4, 1, '2024-09-07', 'Pedro Rodr', 2, 'eeeee', 'Alas de Pollo a Granel\r', 'Cava1', 'F1', 'Nivel1', 600.00, NULL, NULL, NULL, NULL, 20, NULL, 1, 71.00, 529.00, 20, NULL, NULL),
(5, 1, '2024-09-08', 'Pedro Rodr', 1, '88888888', 'Alas de Pollo a Granel\r', 'Cava1', 'F1', 'Nivel1', 500.00, 20, NULL, NULL, NULL, NULL, NULL, 1, 75.00, 425.00, 20, NULL, NULL),
(6, 1, '2024-09-08', 'Pedro Rodr', 2, '88888888', 'Asaduras de Cerdo\r', 'Cava1', 'F1', 'Nivel1', 400.00, 40, NULL, NULL, NULL, NULL, NULL, 1, 125.00, 275.00, 40, NULL, NULL),
(7, 1, '2024-09-08', 'Pedro Rodr', 3, '88888888', 'Asaduras de Cerdo\r', 'Cava1', 'F1', 'Nivel1', 300.00, 30, NULL, NULL, NULL, NULL, NULL, 1, 100.00, 200.00, 30, NULL, NULL),
(8, 1, '2024-09-09', 'Pedro Rodr', 1, '88888', 'Alas de Pollo (Emp. 5 Kg)\r', 'Cava1', 'F1', 'Nivel1', 600.00, 40, NULL, NULL, NULL, NULL, NULL, 1, 125.00, 475.00, 40, NULL, NULL),
(9, 1, '2024-09-09', 'Pedro Rodr', 2, '88888', 'Alas de Pollo (Emp. 5 Kg)\r', 'Cava1', 'F1', 'Nivel1', 500.00, 30, NULL, NULL, NULL, NULL, NULL, 1, 100.00, 400.00, 30, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `totales`
--

CREATE TABLE `totales` (
  `id` int(11) NOT NULL,
  `ncontrol` int(11) DEFAULT NULL,
  `codcli` varchar(255) NOT NULL,
  `fechar` date NOT NULL,
  `totalBruto` decimal(10,2) DEFAULT NULL,
  `totalTara` decimal(10,2) DEFAULT NULL,
  `totalNeto` decimal(10,2) DEFAULT NULL,
  `tcg25` int(10) DEFAULT NULL,
  `tcg24` int(10) DEFAULT NULL,
  `tcg23` int(10) DEFAULT NULL,
  `tcg22` int(10) DEFAULT NULL,
  `tcm` int(10) DEFAULT NULL,
  `tcp` int(10) DEFAULT NULL,
  `testiba` int(10) DEFAULT NULL,
  `tcestas` int(10) DEFAULT NULL,
  `tbultos` int(10) DEFAULT NULL,
  `tunidad` int(10) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `totales`
--

INSERT INTO `totales` (`id`, `ncontrol`, `codcli`, `fechar`, `totalBruto`, `totalTara`, `totalNeto`, `tcg25`, `tcg24`, `tcg23`, `tcg22`, `tcm`, `tcp`, `testiba`, `tcestas`, `tbultos`, `tunidad`, `createdAt`, `updatedAt`) VALUES
(1, 1, 'Pedro Rodriguez', '2024-09-07', 500.00, 150.00, 350.00, 50, NULL, NULL, NULL, NULL, NULL, 1, 50, NULL, NULL, '2024-09-07 18:02:51', '2024-09-07 18:02:51'),
(2, 1, 'Pedro Rodriguez', '2024-09-07', 500.00, 150.00, 350.00, 50, 0, 0, 0, 0, 0, 1, 50, 0, 0, '2024-09-07 18:12:23', '2024-09-07 18:12:23'),
(3, 1, 'Pedro Rodriguez', '2024-09-07', 900.00, 146.00, 754.00, 20, 0, 0, 0, 20, 0, 2, 40, 0, 0, '2024-09-07 18:50:14', '2024-09-07 18:50:14'),
(4, 1, 'Pedro Rodriguez', '2024-09-08', 1200.00, 300.00, 900.00, 90, 0, 0, 0, 0, 0, 3, 90, 0, 0, '2024-09-08 05:11:31', '2024-09-08 05:11:31'),
(5, 1, 'Pedro Rodriguez', '2024-09-09', 1100.00, 225.00, 875.00, 70, 0, 0, 0, 0, 0, 2, 70, 0, 0, '2024-09-09 04:16:10', '2024-09-09 04:16:10');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ubicaciones`
--

CREATE TABLE `ubicaciones` (
  `id_cava` int(10) NOT NULL,
  `id_fila` varchar(3) NOT NULL,
  `ubicacion` varchar(20) NOT NULL,
  `paleta` varchar(20) NOT NULL,
  `kgs` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ubicaciones`
--

INSERT INTO `ubicaciones` (`id_cava`, `id_fila`, `ubicacion`, `paleta`, `kgs`) VALUES
(0, 'f1', 'ubicacion1', 'paleta1', 0.00),
(0, 'f1', 'ubicacion1', 'paleta2', 0.00),
(0, 'f1', 'ubicacion2', 'paleta1', 0.00),
(0, 'f1', 'ubicacion2', 'paleta2', 0.00),
(0, 'f1', 'ubicacion3', 'paleta1', 0.00),
(0, 'f1', 'ubicacion3', 'paleta2', 0.00),
(0, 'f1', 'ubicacion4', 'paleta1', 0.00),
(0, 'f1', 'uicacion4', 'paleta2', 0.00);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cavas`
--
ALTER TABLE `cavas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `codigo` (`codigo`);

--
-- Indices de la tabla `inv_cli`
--
ALTER TABLE `inv_cli`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `numero_control`
--
ALTER TABLE `numero_control`
  ADD PRIMARY KEY (`ncontrolrecep`);

--
-- Indices de la tabla `producto`
--
ALTER TABLE `producto`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `recepcion`
--
ALTER TABLE `recepcion`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `totales`
--
ALTER TABLE `totales`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cavas`
--
ALTER TABLE `cavas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `clientes`
--
ALTER TABLE `clientes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `inv_cli`
--
ALTER TABLE `inv_cli`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `producto`
--
ALTER TABLE `producto`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=285;

--
-- AUTO_INCREMENT de la tabla `recepcion`
--
ALTER TABLE `recepcion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `totales`
--
ALTER TABLE `totales`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
