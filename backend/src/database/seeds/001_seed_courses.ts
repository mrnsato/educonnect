import pool from "../connection";
import createTables from "../migrations/001_create_tables";

async function seedDatabase(): Promise<void> {
  await createTables();
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    await client.query("DELETE FROM lessons");
    await client.query("DELETE FROM courses");
    await client.query("DELETE FROM categories");
    await client.query("ALTER SEQUENCE categories_id_seq RESTART WITH 1");
    await client.query("ALTER SEQUENCE courses_id_seq RESTART WITH 1");
    await client.query("ALTER SEQUENCE lessons_id_seq RESTART WITH 1");

    await client.query(`
      INSERT INTO categories (name, description, icon) VALUES
        ('Informática Básica', 'Aprenda a usar o computador, mouse, teclado e sistema operacional', '🖥️'),
        ('Internet e Navegação', 'Navegue na internet com segurança e aproveite seus recursos', '🌐'),
        ('Ferramentas de Produtividade', 'Domine ferramentas como Google Docs, Planilhas e apresentações', '📊'),
        ('Comunicação Digital', 'Aprenda a usar e-mail, mensagens e videochamadas', '💬'),
        ('Introdução à Programação', 'Dê seus primeiros passos no mundo da programação', '💻'),
        ('Segurança Digital', 'Proteja seus dados e navegue com segurança na internet', '🔒');
    `);
    console.log("✅ 6 categorias inseridas!");

    const course1 = await client.query(`
      INSERT INTO courses (title, description, category_id, level, thumbnail_url)
      VALUES ('Informática Básica para Iniciantes', 'Aprenda do zero a usar o computador: ligar, desligar, usar o mouse, teclado e entender o sistema operacional Windows.', 1, 'iniciante', 'https://img.youtube.com/vi/bsssPbMIaGc/maxresdefault.jpg') RETURNING id;
    `);
    await client.query(`
      INSERT INTO lessons (course_id, title, video_url, duration, order_index) VALUES
        (${course1.rows[0].id}, 'O que é um computador e suas partes', 'https://www.youtube.com/watch?v=bsssPbMIaGc', '15:30', 1),
        (${course1.rows[0].id}, 'Como usar o mouse e o teclado', 'https://www.youtube.com/watch?v=LgAr43JKD5E', '12:45', 2),
        (${course1.rows[0].id}, 'Conhecendo o Windows - Área de trabalho', 'https://www.youtube.com/watch?v=4EZ_s2C2Mts', '18:20', 3),
        (${course1.rows[0].id}, 'Como criar pastas e organizar arquivos', 'https://www.youtube.com/watch?v=4I-eGp2UXWI', '14:10', 4);
    `);

    const course2 = await client.query(`
      INSERT INTO courses (title, description, category_id, level, thumbnail_url)
      VALUES ('Curso de Digitação para Iniciantes', 'Aprenda a digitar corretamente usando todos os dedos. Melhore sua velocidade e produtividade no computador.', 1, 'iniciante', 'https://img.youtube.com/vi/yTRSTSm_Uu0/maxresdefault.jpg') RETURNING id;
    `);
    await client.query(`
      INSERT INTO lessons (course_id, title, video_url, duration, order_index) VALUES
        (${course2.rows[0].id}, 'Posição correta das mãos no teclado', 'https://www.youtube.com/watch?v=yTRSTSm_Uu0', '10:15', 1),
        (${course2.rows[0].id}, 'Praticando as teclas da fileira central', 'https://www.youtube.com/watch?v=GFBp8B0W2KM', '12:30', 2),
        (${course2.rows[0].id}, 'Dicas para aumentar a velocidade', 'https://www.youtube.com/watch?v=2hB5k6VHwDs', '8:45', 3);
    `);

    const course3 = await client.query(`
      INSERT INTO courses (title, description, category_id, level, thumbnail_url)
      VALUES ('Como Usar a Internet com Segurança', 'Aprenda a navegar na internet, usar buscadores, acessar sites e identificar páginas seguras.', 2, 'iniciante', 'https://img.youtube.com/vi/1vS6VN3e1p8/maxresdefault.jpg') RETURNING id;
    `);
    await client.query(`
      INSERT INTO lessons (course_id, title, video_url, duration, order_index) VALUES
        (${course3.rows[0].id}, 'O que é a internet e como funciona', 'https://www.youtube.com/watch?v=1vS6VN3e1p8', '14:00', 1),
        (${course3.rows[0].id}, 'Como usar o Google para pesquisar', 'https://www.youtube.com/watch?v=kH8Xn_HHVOQ', '11:20', 2),
        (${course3.rows[0].id}, 'Sites seguros vs sites perigosos', 'https://www.youtube.com/watch?v=GFBp8B0W2KM', '13:15', 3);
    `);

    const course4 = await client.query(`
      INSERT INTO courses (title, description, category_id, level, thumbnail_url)
      VALUES ('Google Docs - Criando Documentos Online', 'Aprenda a criar, editar e compartilhar documentos de texto usando o Google Docs gratuitamente.', 3, 'iniciante', 'https://img.youtube.com/vi/aEVGGk0bNw0/maxresdefault.jpg') RETURNING id;
    `);
    await client.query(`
      INSERT INTO lessons (course_id, title, video_url, duration, order_index) VALUES
        (${course4.rows[0].id}, 'Criando sua conta Google', 'https://www.youtube.com/watch?v=aEVGGk0bNw0', '8:30', 1),
        (${course4.rows[0].id}, 'Criando seu primeiro documento', 'https://www.youtube.com/watch?v=sSI7Sn8yNOo', '15:45', 2),
        (${course4.rows[0].id}, 'Formatando textos no Google Docs', 'https://www.youtube.com/watch?v=VrDHBpVCTwo', '12:00', 3),
        (${course4.rows[0].id}, 'Compartilhando documentos', 'https://www.youtube.com/watch?v=6_hbSz0zSLs', '10:20', 4);
    `);

    const course5 = await client.query(`
      INSERT INTO courses (title, description, category_id, level, thumbnail_url)
      VALUES ('Google Planilhas para o Dia a Dia', 'Aprenda a criar planilhas para organizar suas finanças, listas e controles pessoais.', 3, 'iniciante', 'https://img.youtube.com/vi/gNoFOsx5B9Y/maxresdefault.jpg') RETURNING id;
    `);
    await client.query(`
      INSERT INTO lessons (course_id, title, video_url, duration, order_index) VALUES
        (${course5.rows[0].id}, 'Conhecendo a interface das Planilhas', 'https://www.youtube.com/watch?v=gNoFOsx5B9Y', '13:00', 1),
        (${course5.rows[0].id}, 'Criando sua primeira planilha', 'https://www.youtube.com/watch?v=Ld8Rg7JZFK0', '16:30', 2),
        (${course5.rows[0].id}, 'Fórmulas básicas: soma e média', 'https://www.youtube.com/watch?v=3tmk2eql6_g', '14:15', 3);
    `);

    const course6 = await client.query(`
      INSERT INTO courses (title, description, category_id, level, thumbnail_url)
      VALUES ('Como Usar o E-mail (Gmail)', 'Aprenda a criar uma conta de e-mail, enviar, responder e organizar suas mensagens no Gmail.', 4, 'iniciante', 'https://img.youtube.com/vi/XU_sp4b00GY/maxresdefault.jpg') RETURNING id;
    `);
    await client.query(`
      INSERT INTO lessons (course_id, title, video_url, duration, order_index) VALUES
        (${course6.rows[0].id}, 'Criando sua conta no Gmail', 'https://www.youtube.com/watch?v=XU_sp4b00GY', '10:00', 1),
        (${course6.rows[0].id}, 'Enviando seu primeiro e-mail', 'https://www.youtube.com/watch?v=FOaNVhBrLBc', '8:45', 2),
        (${course6.rows[0].id}, 'Anexando arquivos e fotos', 'https://www.youtube.com/watch?v=lBB0JNdxSf0', '11:30', 3),
        (${course6.rows[0].id}, 'Organizando sua caixa de entrada', 'https://www.youtube.com/watch?v=NZaCNJ1gJNw', '9:20', 4);
    `);

    const course7 = await client.query(`
      INSERT INTO courses (title, description, category_id, level, thumbnail_url)
      VALUES ('WhatsApp - Guia Completo para Iniciantes', 'Aprenda a usar o WhatsApp: enviar mensagens, fotos, áudios, fazer chamadas de vídeo e criar grupos.', 4, 'iniciante', 'https://img.youtube.com/vi/AEr_MDP4aQI/maxresdefault.jpg') RETURNING id;
    `);
    await client.query(`
      INSERT INTO lessons (course_id, title, video_url, duration, order_index) VALUES
        (${course7.rows[0].id}, 'Instalando e configurando o WhatsApp', 'https://www.youtube.com/watch?v=AEr_MDP4aQI', '12:00', 1),
        (${course7.rows[0].id}, 'Enviando mensagens, fotos e áudios', 'https://www.youtube.com/watch?v=LKmQvLUWOWg', '10:30', 2),
        (${course7.rows[0].id}, 'Fazendo chamadas de voz e vídeo', 'https://www.youtube.com/watch?v=vDFLPsYR3Ro', '8:15', 3);
    `);

    const course8 = await client.query(`
      INSERT INTO courses (title, description, category_id, level, thumbnail_url)
      VALUES ('Lógica de Programação para Iniciantes', 'Entenda o pensamento lógico por trás da programação. Ideal para quem nunca programou.', 5, 'iniciante', 'https://img.youtube.com/vi/8mei6uVttho/maxresdefault.jpg') RETURNING id;
    `);
    await client.query(`
      INSERT INTO lessons (course_id, title, video_url, duration, order_index) VALUES
        (${course8.rows[0].id}, 'O que é lógica de programação?', 'https://www.youtube.com/watch?v=8mei6uVttho', '16:00', 1),
        (${course8.rows[0].id}, 'Variáveis e tipos de dados', 'https://www.youtube.com/watch?v=Rz0gMOFkSMg', '18:30', 2),
        (${course8.rows[0].id}, 'Estruturas condicionais (se/senão)', 'https://www.youtube.com/watch?v=_g05aHdBAEY', '20:15', 3),
        (${course8.rows[0].id}, 'Estruturas de repetição (loops)', 'https://www.youtube.com/watch?v=AGiTniRcLWo', '19:45', 4);
    `);

    const course9 = await client.query(`
      INSERT INTO courses (title, description, category_id, level, thumbnail_url)
      VALUES ('HTML e CSS - Criando sua Primeira Página Web', 'Aprenda a criar páginas web do zero usando HTML e CSS. Nenhum conhecimento prévio necessário.', 5, 'intermediario', 'https://img.youtube.com/vi/Ejkb_YpuHWs/maxresdefault.jpg') RETURNING id;
    `);
    await client.query(`
      INSERT INTO lessons (course_id, title, video_url, duration, order_index) VALUES
        (${course9.rows[0].id}, 'O que é HTML e para que serve', 'https://www.youtube.com/watch?v=Ejkb_YpuHWs', '15:00', 1),
        (${course9.rows[0].id}, 'Criando a estrutura de uma página', 'https://www.youtube.com/watch?v=TaaCr_R5pig', '20:30', 2),
        (${course9.rows[0].id}, 'Introdução ao CSS - Estilizando a página', 'https://www.youtube.com/watch?v=byqhpuVgvFo', '22:00', 3);
    `);

    const course10 = await client.query(`
      INSERT INTO courses (title, description, category_id, level, thumbnail_url)
      VALUES ('Segurança Digital - Proteja seus Dados', 'Aprenda a criar senhas fortes, identificar golpes online e proteger suas informações pessoais.', 6, 'iniciante', 'https://img.youtube.com/vi/l8WPKQN0cxY/maxresdefault.jpg') RETURNING id;
    `);
    await client.query(`
      INSERT INTO lessons (course_id, title, video_url, duration, order_index) VALUES
        (${course10.rows[0].id}, 'Como criar senhas fortes e seguras', 'https://www.youtube.com/watch?v=l8WPKQN0cxY', '11:00', 1),
        (${course10.rows[0].id}, 'Identificando golpes e fraudes online', 'https://www.youtube.com/watch?v=XU_sp4b00GY', '14:30', 2),
        (${course10.rows[0].id}, 'Protegendo seu celular e computador', 'https://www.youtube.com/watch?v=FOaNVhBrLBc', '13:00', 3);
    `);

    await client.query("COMMIT");
    console.log("\n🎉 Seed concluído com sucesso!");
    console.log("📚 10 cursos com 34 aulas inseridos!");
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("❌ Erro no seed:", error);
    throw error;
  } finally {
    client.release();
  }
}

seedDatabase()
  .then(() => process.exit(0))
  .catch(() => process.exit(1));

export default seedDatabase;
