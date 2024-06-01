const products = [
  {
    id: 1,
    title: 'Laptop Gamer ASUS ROG Strix G15',
    description: 'Laptop gamer con procesador AMD Ryzen 7 6800H, gráfica NVIDIA GeForce RTX 3060 y pantalla de 144Hz.',
    detailedDescription: 'La ASUS ROG Strix G15 es una laptop diseñada para los entusiastas de los videojuegos. Equipada con un potente procesador AMD Ryzen 7 6800H y una tarjeta gráfica NVIDIA GeForce RTX 3060, esta máquina garantiza un rendimiento excepcional en los juegos más exigentes. Su pantalla de 15.6 pulgadas con una frecuencia de actualización de 144Hz ofrece una experiencia visual fluida y vibrante. Además, cuenta con un sistema de refrigeración avanzado para mantener las temperaturas bajo control durante largas sesiones de juego. Ideal tanto para jugadores profesionales como para aquellos que buscan una experiencia de juego inmersiva.',
    price: 2499990,
    image: 'laptopStrixG15.jpg',
    stock: 10,
    category: 'computadoras-notebooks'
  },
  {
    id: 2,
    title: 'Samsung Galaxy S23',
    description: 'Teléfono inteligente con pantalla Dynamic AMOLED 2X de 6.1", cámara de 50MP y procesador Snapdragon 8 Gen 2.',
    detailedDescription: 'El Samsung Galaxy S23 es un teléfono inteligente de alta gama que combina tecnología avanzada y diseño elegante. Su pantalla Dynamic AMOLED 2X de 6.1 pulgadas ofrece colores vibrantes y negros profundos, ideal para ver videos y jugar. Equipado con una cámara principal de 50MP, captura fotos y videos con una calidad impresionante, incluso en condiciones de poca luz. El procesador Snapdragon 8 Gen 2 garantiza un rendimiento rápido y eficiente, perfecto para multitareas y aplicaciones exigentes. Además, cuenta con una batería de larga duración y opciones de carga rápida e inalámbrica.',
    price: 1744999,
    image: 'smartphoneS23.jpg',
    stock: 5,
    category: 'celulares-tablets'
  },
  {
    id: 3,
    title: 'Auriculares Sony WH-1000XM5',
    description: 'Auriculares inalámbricos con cancelación de ruido activa, sonido de alta fidelidad y autonomía de hasta 30 horas.',
    detailedDescription: 'Los auriculares Sony WH-1000XM5 son la quinta generación de la aclamada serie de auriculares con cancelación de ruido de Sony. Estos auriculares ofrecen una calidad de sonido superior con graves profundos y agudos claros, gracias a su tecnología de alta resolución de audio. La cancelación de ruido activa es líder en la industria, permitiéndote disfrutar de tu música sin interrupciones, sin importar dónde te encuentres. Con una batería que dura hasta 30 horas, puedes escuchar música todo el día sin preocuparte por la carga. Además, son cómodos de llevar gracias a su diseño ergonómico y sus almohadillas suaves.',
    price: 659999,
    image: 'headphonesWH-1000XM5.jpg',
    stock: 15,
    category: 'accesorios'
  },
  {
    id: 4,
    title: 'Apple Watch Series 8',
    description: 'Reloj inteligente con GPS, sensor de temperatura, detección de caídas y resistencia al agua.',
    detailedDescription: 'El Apple Watch Series 8 es un reloj inteligente que va más allá de decir la hora. Con GPS integrado y resistencia al agua, es perfecto para actividades al aire libre y deportivas. Su sensor de temperatura y las capacidades avanzadas de monitoreo de salud permiten un seguimiento preciso de tu bienestar. La detección de caídas es una función de seguridad crucial que puede alertar a los servicios de emergencia en caso de una caída grave. Además, el Series 8 ofrece una gran variedad de aplicaciones y personalizaciones para adaptarse a tu estilo de vida.',
    price: 739999,
    image: 'smartwatchSeries8.jpg',
    stock: 20,
    category: 'accesorios'
  },
  {
    id: 5,
    title: 'Samsung Galaxy Tab S8',
    description: 'Tablet con pantalla LCD de 11", procesador Snapdragon 8 Gen 1 y S Pen incluido.',
    detailedDescription: 'La Samsung Galaxy Tab S8 es una tablet versátil que combina rendimiento y portabilidad. Con una pantalla LCD de 11 pulgadas, ofrece una experiencia visual nítida y brillante. El procesador Snapdragon 8 Gen 1 proporciona un rendimiento rápido y eficiente, ideal para multitareas, juegos y consumo de contenido multimedia. El S Pen incluido permite tomar notas y dibujar con precisión, haciendo de esta tablet una herramienta perfecta para la creatividad y la productividad. Además, cuenta con una batería de larga duración y opciones de conectividad avanzada.',
    price: 1559990,
    image: 'tabletTabS8.jpg',
    stock: 8,
    category: 'celulares-tablets'
  },
  {
    id: 6,
    title: 'Teclado Logitech MX Keys',
    description: 'Teclado inalámbrico retroiluminado con teclas Perfect Stroke y conectividad multidispositivo.',
    detailedDescription: 'El Logitech MX Keys es un teclado inalámbrico diseñado para ofrecer una experiencia de escritura superior. Sus teclas Perfect Stroke están diseñadas para proporcionar una sensación táctil satisfactoria y precisa. La retroiluminación ajustable permite trabajar en cualquier condición de iluminación. Con conectividad multidispositivo, puedes emparejar el teclado con hasta tres dispositivos y cambiar fácilmente entre ellos con solo presionar un botón. Además, su diseño compacto y elegante lo convierte en una excelente adición a cualquier espacio de trabajo.',
    price: 289997,
    image: 'keyboardMXKeys.jpg',
    stock: 12,
    category: 'accesorios'
  },
  {
    id: 7,
    title: 'Mouse Razer DeathAdder V3 Pro',
    description: 'Mouse inalámbrico gamer con sensor óptico Focus Pro 30K y switches ópticos de tercera generación.',
    detailedDescription: 'El Razer DeathAdder V3 Pro es un mouse inalámbrico diseñado para jugadores serios. Equipado con el sensor óptico Focus Pro 30K, ofrece una precisión y velocidad excepcionales, cruciales para los juegos competitivos. Los switches ópticos de tercera generación proporcionan una respuesta rápida y una durabilidad mejorada. Su diseño ergonómico asegura comodidad durante largas sesiones de juego. Además, cuenta con una batería de larga duración y opciones de personalización avanzada a través del software Razer Synapse.',
    price: 224929,
    image: 'mouseV3Pro.jpg',
    stock: 18,
    category: 'accesorios'
  },
  {
    id: 8,
    title: 'Monitor Dell UltraSharp U2723QE',
    description: 'Monitor 4K de 27 pulgadas con panel IPS Black, cobertura de color 98% DCI-P3 y puerto USB-C.',
    detailedDescription: 'El monitor Dell UltraSharp U2723QE es una excelente opción para profesionales que requieren una alta calidad de imagen y precisión en los colores. Su panel IPS Black ofrece un contraste mejorado y una reproducción de color precisa con una cobertura del 98% DCI-P3. La resolución 4K proporciona detalles nítidos y una claridad excepcional. Además, el puerto USB-C permite una conexión rápida y sencilla, proporcionando carga y transmisión de datos con un solo cable. Ideal para edición de video, diseño gráfico y otras aplicaciones creativas.',
    price: 1695000,
    image: 'monitorUltraSharpU2723QE.jpg',
    stock: 6,
    category: 'televisores-monitores'
  },
  {
    id: 9,
    title: 'Altavoz JBL Flip 6',
    description: 'Altavoz Bluetooth portátil con sonido potente, resistencia al agua IP67 y autonomía de hasta 12 horas.',
    detailedDescription: 'El JBL Flip 6 es un altavoz Bluetooth portátil que ofrece un sonido potente y claro en cualquier entorno. Su diseño robusto y resistente al agua con certificación IP67 lo hace ideal para llevar a la playa, la piscina o cualquier aventura al aire libre. Con una autonomía de hasta 12 horas, puedes disfrutar de tu música favorita durante todo el día sin preocuparte por la batería. Además, su conectividad Bluetooth permite emparejarlo fácilmente con cualquier dispositivo móvil, ofreciendo una experiencia de audio inalámbrica y conveniente.',
    price: 225000,
    image: 'speakerFlip6.jpg',
    stock: 25,
    category: 'accesorios'
  },
  {
    id: 10,
    title: 'iPhone 15 Pro Max',
    description: 'Smartphone de última generación con cámara de alta resolución.',
    detailedDescription: 'El iPhone 15 Pro Max es el último modelo de Apple, con innovaciones en cada aspecto. Su cámara de alta resolución permite capturar fotos y videos con una claridad y detalle sorprendentes. La nueva arquitectura de chip proporciona un rendimiento excepcional, mientras que la batería de larga duración asegura que puedas usar tu teléfono durante todo el día. La pantalla Super Retina XDR ofrece colores vibrantes y un brillo impresionante, ideal para cualquier tipo de contenido. Además, cuenta con nuevas características de seguridad y privacidad para proteger tus datos.',
    price: 4949900,
    image: 'iphone15.jpg',
    stock: 8,
    category: 'celulares-tablets'
  },
  {
    id: 11,
    title: 'Samsung Galaxy S23 Ultra',
    description: 'Potente smartphone Android con pantalla AMOLED y excelente rendimiento.',
    detailedDescription: 'El Samsung Galaxy S23 Ultra es un smartphone de alta gama diseñado para aquellos que buscan el máximo rendimiento y características avanzadas. Su pantalla AMOLED proporciona colores vivos y un contraste impresionante, ideal para ver contenido multimedia. Equipado con una cámara avanzada, permite capturar imágenes y videos de calidad profesional. El potente procesador y la gran cantidad de memoria RAM aseguran un rendimiento rápido y fluido, incluso en las aplicaciones más exigentes. Además, su diseño elegante y moderno lo convierte en un dispositivo atractivo.',
    price: 1999999,
    image: 'galaxys23U.jpg',
    stock: 12,
    category: 'celulares-tablets'
  },
  {
    id: 12,
    title: 'iPad Pro 12.9"',
    description: 'Tablet de alta gama con pantalla Liquid Retina XDR y chip M2.',
    detailedDescription: 'El iPad Pro 12.9" es la tablet más avanzada de Apple, diseñada para profesionales y creativos. Su pantalla Liquid Retina XDR ofrece una calidad de imagen excepcional con colores precisos y un alto rango dinámico. El chip M2 proporciona un rendimiento increíblemente rápido, capaz de manejar las tareas más exigentes como edición de video 4K y modelado 3D. Además, es compatible con el Apple Pencil y el Magic Keyboard, convirtiéndolo en una herramienta versátil para el trabajo y la creatividad. Su diseño delgado y ligero lo hace fácil de llevar a cualquier lugar.',
    price: 2269499,
    image: 'ipadpro.jpg',
    stock: 5,
    category: 'celulares-tablets'
  },
  {
    id: 13,
    title: 'MacBook Air M2',
    description: 'Ultraportátil con chip M2 y una batería de larga duración.',
    detailedDescription: 'El MacBook Air M2 es la última versión del ultraportátil de Apple, ahora con el potente chip M2. Este nuevo procesador ofrece un rendimiento significativamente mejorado y una eficiencia energética que permite una mayor duración de la batería. Con un diseño delgado y ligero, es ideal para llevar a cualquier lugar. La pantalla Retina ofrece colores vivos y detalles nítidos, mientras que el teclado Magic Keyboard y el trackpad Force Touch proporcionan una experiencia de usuario cómoda y precisa. Además, cuenta con una amplia variedad de puertos y opciones de conectividad para adaptarse a todas tus necesidades.',
    price: 1999999,
    image: 'macbookair.jpg',
    stock: 7,
    category: 'computadoras-notebooks'
  },
  {
    id: 14,
    title: 'Dell XPS 13 Plus',
    description: 'Laptop ultradelgada con pantalla OLED y un diseño innovador.',
    detailedDescription: 'La Dell XPS 13 Plus es una laptop ultradelgada que combina rendimiento y estilo. Su pantalla OLED ofrece colores vibrantes y negros profundos, perfecta para ver contenido en alta definición. El diseño innovador incluye un teclado sin bordes y un touchpad invisible, proporcionando una experiencia de usuario moderna y eficiente. Equipado con los últimos procesadores y una memoria RAM rápida, garantiza un rendimiento fluido y rápido. Ideal para profesionales que necesitan una laptop potente y portátil para el trabajo y el entretenimiento.',
    price: 4584514,
    image: 'dellxps.jpg',
    stock: 10,
    category: 'computadoras-notebooks'
  },
  {
    id: 15,
    title: 'LG OLED C3',
    description: 'Televisor OLED con una calidad de imagen excepcional y tecnología Dolby Vision.',
    detailedDescription: 'El LG OLED C3 es un televisor que ofrece una calidad de imagen impresionante gracias a su tecnología OLED. Los píxeles autoiluminados proporcionan negros perfectos y un contraste infinito, ideal para ver películas y programas de televisión en alta definición. Además, la tecnología Dolby Vision mejora aún más la experiencia visual al ajustar el brillo, el color y el contraste para cada escena. Con múltiples puertos HDMI y opciones de conectividad avanzada, es perfecto para configurar un sistema de entretenimiento completo en tu hogar.',
    price: 3500000,
    image: 'lgoled.jpg',
    stock: 6,
    category: 'televisores-monitores'
  },
  {
    id: 16,
    title: 'Samsung Neo QLED QN90A',
    description: 'Televisor QLED con Mini LEDs para un brillo y contraste increíbles.',
    detailedDescription: 'El Samsung Neo QLED QN90A es un televisor de última generación que utiliza Mini LEDs para proporcionar un brillo y un contraste excepcionales. Su tecnología Quantum Matrix garantiza una precisión y una claridad impresionantes, mientras que el Quantum HDR 32X ofrece un rango dinámico más amplio, proporcionando detalles más profundos y colores más vivos. Además, su diseño delgado y elegante encaja perfectamente en cualquier espacio. Con múltiples opciones de conectividad y funciones inteligentes, este televisor es ideal para disfrutar de una experiencia de entretenimiento inmersiva en el hogar.',
    price: 1699990,
    image: 'samsungqled.jpg',
    stock: 9,
    category: 'televisores-monitores'
  },
  {
    id: 17,
    title: 'Bose QuietComfort 45',
    description: 'Auriculares con cancelación de ruido líderes en la industria.',
    detailedDescription: 'Los Bose QuietComfort 45 son auriculares diseñados para proporcionar una experiencia auditiva inigualable. Su tecnología avanzada de cancelación de ruido elimina los sonidos no deseados, permitiéndote disfrutar de tu música sin distracciones. Ofrecen un sonido de alta calidad con graves profundos y agudos claros, ideal para cualquier tipo de música. La comodidad es una prioridad con almohadillas suaves y un diseño ergonómico que se ajusta perfectamente. Con una batería de larga duración y conectividad inalámbrica, son perfectos para viajar, trabajar o relajarse.',
    price: 599999,
    image: 'boseqc45.jpg',
    stock: 15,
    category: 'accesorios'
  },
  {
    id: 18,
    title: 'Logitech MX Master 3S',
    description: 'Mouse ergonómico con una precisión excepcional y conectividad multidispositivo.',
    detailedDescription: 'El Logitech MX Master 3S es un mouse ergonómico diseñado para ofrecer una precisión y un control excepcionales. Su sensor avanzado permite un seguimiento preciso en cualquier superficie, incluso en vidrio. La rueda de desplazamiento electromagnética MagSpeed es rápida y silenciosa, proporcionando una experiencia de usuario fluida. Con la capacidad de conectarse a múltiples dispositivos, puedes cambiar fácilmente entre tu computadora, tablet y otros dispositivos con solo presionar un botón. Además, su diseño ergonómico reduce la tensión en la muñeca, permitiendo un uso cómodo durante largas jornadas de trabajo.',
    price: 144288,
    image: 'logitechmx.jpg',
    stock: 20,
    category: 'accesorios'
  },
  {
    id: 19,
    title: 'SanDisk Extreme Portable SSD 1TB',
    description: 'Unidad de estado sólido portátil con velocidades de transferencia ultrarrápidas.',
    detailedDescription: 'La SanDisk Extreme Portable SSD 1TB es una solución de almacenamiento portátil que ofrece velocidades de transferencia ultrarrápidas. Con una velocidad de lectura de hasta 1050MB/s y una velocidad de escritura de hasta 1000MB/s, es ideal para transferir archivos grandes rápidamente. Su diseño compacto y duradero la hace perfecta para llevar a cualquier lugar, y es resistente al agua y al polvo con una clasificación IP55. Perfecta para fotógrafos, videógrafos y cualquier persona que necesite almacenamiento rápido y fiable en movimiento.',
    price: 239.000,
    image: 'sandiskssd.jpg',
    stock: 18,
    category: 'accesorios'
  },
  {
    id: 20,
    title: 'Cámara GoPro HERO11 Black',
    description: 'Cámara de acción resistente al agua con video 5.3K y estabilización HyperSmooth 5.0.',
    detailedDescription: 'La GoPro HERO11 Black es una cámara de acción de última generación diseñada para capturar tus aventuras con una calidad impresionante. Con capacidad de grabación en 5.3K, ofrece una resolución increíblemente alta y detalles nítidos. La estabilización de imagen HyperSmooth 5.0 garantiza videos fluidos y sin temblores, incluso en las condiciones más extremas. Resistente al agua hasta 10 metros sin necesidad de carcasa, es perfecta para deportes acuáticos y actividades al aire libre. Además, cuenta con una amplia gama de accesorios y monturas para adaptarse a cualquier situación.',
    price: 839000,
    image: 'gopro.jpg',
    stock: 12,
    category: 'accesorios'
  },
  {
    id: 21,
    title: 'Impresora HP LaserJet Pro M404dw',
    description: 'Impresora láser monocromática inalámbrica con impresión dúplex automática.',
    detailedDescription: 'La HP LaserJet Pro M404dw es una impresora láser monocromática diseñada para pequeñas y medianas empresas. Ofrece impresión rápida y de alta calidad con una velocidad de hasta 40 páginas por minuto. La función de impresión dúplex automática permite ahorrar papel y reducir costos. Con conectividad inalámbrica, puedes imprimir desde cualquier lugar de la oficina usando tu dispositivo móvil. Además, su diseño compacto y eficiente en energía la hace perfecta para cualquier espacio de trabajo.',
    price: 769999,
    image: 'impresora.jpg',
    stock: 8,
    category: 'accesorios'
  }
];

export const getProducts = async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return products;
};

export const getProductById = async (id) => {
  await new Promise((resolve) => setTimeout(resolve, 2000)); 
  const product = products.find(prod => prod.id === parseInt(id));
  return product;
};

export const getProductsByCategory = async (categoryId) => {
  await new Promise((resolve) => setTimeout(resolve, 2000)); 
  const filteredProducts = products.filter(prod => prod.category === categoryId);
  return filteredProducts;
};
