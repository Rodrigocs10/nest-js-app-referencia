
CREATE TABLE `perfil_acesso` (
  `id_perfil` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `perfil` varchar(100) NOT NULL,
  PRIMARY KEY (`id_perfil`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

CREATE TABLE `usuario` (
  `id_usuario` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_perfil` int(10) unsigned NOT NULL,
  `usuario` varchar(16) NOT NULL,
  `email` varchar(255) NOT NULL,
  `cargo` varchar(255) DEFAULT NULL,
  `senha` varchar(64) NOT NULL,
  `ativo` tinyint(4) NOT NULL DEFAULT '1',
  `criado` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `atualizado` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `avatar` blob,
  PRIMARY KEY (`id_usuario`),
  KEY `id_usuario_perfil_idx` (`id_perfil`),
  CONSTRAINT `id_usuario_perfil` FOREIGN KEY (`id_perfil`) REFERENCES `perfil_acesso` (`id_perfil`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;