INSERT INTO perfil_acesso (id_perfil, perfil) VALUES
	 (1, 'Bloqueado'),
	 (2, 'Administrador'),
	 (3, 'Gerente'),
	 (4, 'Supervisor'),
	 (5, 'Usuário'),
	 (6, 'Estagiário');


INSERT INTO usuario (id_perfil,usuario,email,cargo,senha,ativo,criado,atualizado,avatar) VALUES	 	 
	 (2,'Teste','teste@ailusion.com.br',NULL,'$2b$10$A2fyWxKLdxMy0dWQCSDH8uXNV6DGPBuz27/iA62akxL/M/VNe3n1u',1,'2023-06-10 15:59:20','2023-06-22 08:59:07',NULL);