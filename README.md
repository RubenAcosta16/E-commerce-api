Hola

este es un proyecto de roadmap: https://roadmap.sh/projects/image-processing-service

este solo era de backend pero quise agregarle un frontend funcional para practicar y dejarlo al 100

obviamente todo esta hecho con typescript ya que me da amsiedad trabajar sin el

en el backend use una arquitectura clean, pero en el front lo hice asi como dios me dio a entender, una disculpa es que aun no aprend alguna arquitectura para el front pero prometo que sera la ultima vez que pasa sorry :(

por cierto le hice test en el back pero luego no supe como enviar imagenes desde el test y pos mejor no hice test para nada de las imagenes, solo user pero se me olvido actualizarlas luego que mejore los middlewares del user y cookies asi que creo que no jalan los test

tambien checa los archivos config de las carpetas frontend y backend, ahi veras las variables de entorno que use, sino esta cosa no te va a jalar

para ejecutar ocupas 2 terminales, en una ejecuta
    cd/backend
    pnpm install
    pnpm run dev

y luego en la otra terminal:
    cd/frontend
    pnpm install
    pnpm run dev
