import type { Exercise, Level } from '../types'

// ============================================================================
// Seed content for PAES Coach.
// Each subject has a set of levels; each level bundles a markdown theory block
// and a list of multiple-choice exercises with detailed explanations.
// ============================================================================

interface RawExercise {
  question: string
  options: string[]
  correctOption: number
  explanation: string
}

interface RawLevel {
  title: string
  xpReward: number
  theory: string
  exercises: RawExercise[]
}

const SUBJECT_LEVELS: Record<string, RawLevel[]> = {
  // --------------------------------------------------------------------------
  // LENGUAJE — Competencia Lectora
  // --------------------------------------------------------------------------
  lenguaje: [
    {
      title: 'Idea principal e ideas secundarias',
      xpReward: 50,
      theory: `# Idea principal vs. ideas secundarias

La **idea principal** es el contenido más importante de un texto o párrafo: aquello que el autor quiere comunicar por sobre todo lo demás. Las **ideas secundarias** la apoyan, la explican o la ejemplifican.

## ¿Cómo encontrarla?
- Pregúntate: *"¿De qué trata principalmente este texto?"*
- Suele aparecer al inicio o al final del párrafo, pero no siempre.
- No la confundas con un detalle llamativo o un ejemplo.

> **Tip PAES:** una idea secundaria correcta sigue siendo *secundaria*. Si una alternativa es verdadera pero muy específica, probablemente no es la idea principal.`,
      exercises: [
        {
          question:
            '"La fotosíntesis permite a las plantas producir su alimento. Gracias a ella, se libera oxígeno, base de la vida en la Tierra." ¿Cuál es la idea principal?',
          options: [
            'Las plantas liberan oxígeno como desecho.',
            'La fotosíntesis es el proceso por el cual las plantas producen su alimento.',
            'El oxígeno es la base de la vida en la Tierra.',
            'Las plantas necesitan luz solar para vivir.',
          ],
          correctOption: 1,
          explanation:
            'La idea principal es el proceso central (la fotosíntesis y la producción de alimento). La liberación de oxígeno es una consecuencia (idea secundaria).',
        },
        {
          question:
            'En un párrafo, una idea que entrega un ejemplo concreto para apoyar la afirmación central se denomina:',
          options: ['Idea principal', 'Tesis', 'Idea secundaria', 'Conclusión'],
          correctOption: 2,
          explanation:
            'Los ejemplos y detalles que sostienen la afirmación central son ideas secundarias; refuerzan, pero no son lo más importante.',
        },
        {
          question:
            '¿Cuál es la mejor estrategia para identificar la idea principal de un párrafo?',
          options: [
            'Buscar la palabra más larga.',
            'Preguntarse de qué trata principalmente el párrafo.',
            'Leer solo la primera oración.',
            'Contar cuántas veces se repite una palabra.',
          ],
          correctOption: 1,
          explanation:
            'Preguntarse "¿de qué trata principalmente?" obliga a sintetizar el contenido global, no a quedarse con un detalle.',
        },
      ],
    },
    {
      title: 'Vocabulario en contexto',
      xpReward: 50,
      theory: `# Vocabulario en contexto

En la PAES no se evalúa el significado de diccionario, sino el significado que una palabra adquiere **dentro del texto**.

## Estrategia de reemplazo
1. Lee la oración completa.
2. Reemplaza la palabra por cada alternativa.
3. Elige la que **mantiene el sentido** y la corrección gramatical.

> Cuidado con los sinónimos que cambian el matiz. *"Cándido"* puede ser **ingenuo** o **blanco**, según el contexto.`,
      exercises: [
        {
          question:
            'En "Su mirada CÁNDIDA revelaba que no comprendía el engaño", la palabra CÁNDIDA puede reemplazarse por:',
          options: ['Maliciosa', 'Ingenua', 'Furiosa', 'Brillante'],
          correctOption: 1,
          explanation:
            'El contexto ("no comprendía el engaño") indica falta de malicia: "ingenua" conserva el sentido.',
        },
        {
          question:
            'En "El argumento era FALAZ y convenció a pocos", FALAZ significa:',
          options: ['Verdadero', 'Engañoso', 'Extenso', 'Brillante'],
          correctOption: 1,
          explanation:
            'Algo falaz es engañoso o erróneo aunque parezca válido; por eso convenció a pocos.',
        },
        {
          question:
            'Para resolver una pregunta de vocabulario contextual conviene:',
          options: [
            'Elegir siempre el sinónimo más culto.',
            'Reemplazar la palabra y verificar que el sentido se mantenga.',
            'Escoger la palabra más corta.',
            'Buscar la definición exacta del diccionario.',
          ],
          correctOption: 1,
          explanation:
            'El método de reemplazo verificando el sentido global es la técnica recomendada; el sinónimo "más culto" puede alterar el matiz.',
        },
      ],
    },
    {
      title: 'Inferencias y propósito del autor',
      xpReward: 60,
      theory: `# Inferencias y propósito

**Inferir** es extraer información que el texto *no dice explícitamente*, pero que se deduce de las pistas entregadas.

## Propósito del autor
Pregúntate por la intención: ¿quiere **informar**, **convencer**, **entretener** o **criticar**?

- Verbos como *"debemos"*, *"es necesario"* → propósito persuasivo.
- Datos y cifras neutras → propósito informativo.

> Una buena inferencia se apoya en el texto, no en tu opinión personal.`,
      exercises: [
        {
          question:
            '"Cerró el libro, suspiró y miró por la ventana durante largo rato." Se infiere que el personaje:',
          options: [
            'Está apurado por salir.',
            'Se encuentra reflexivo o pensativo.',
            'Odia leer.',
            'Tiene frío.',
          ],
          correctOption: 1,
          explanation:
            'El suspiro y la mirada prolongada por la ventana sugieren un estado reflexivo; es una inferencia apoyada en las pistas del texto.',
        },
        {
          question:
            'Un texto lleno de cifras, fechas y datos neutrales tiene principalmente un propósito:',
          options: ['Persuasivo', 'Informativo', 'Poético', 'Humorístico'],
          correctOption: 1,
          explanation:
            'La presentación objetiva de datos sin valoraciones apunta a informar.',
        },
        {
          question: 'Una inferencia válida debe:',
          options: [
            'Basarse en la opinión del lector.',
            'Apoyarse en pistas presentes en el texto.',
            'Contradecir el texto.',
            'Repetir literalmente lo escrito.',
          ],
          correctOption: 1,
          explanation:
            'Inferir no es opinar: la deducción debe sostenerse en evidencia textual.',
        },
      ],
    },
    {
      title: 'Conectores y coherencia',
      xpReward: 60,
      theory: `# Conectores y coherencia textual

Los **conectores** unen ideas y marcan la relación lógica entre ellas.

| Relación | Conectores |
|---|---|
| Adición | además, asimismo, también |
| Oposición | sin embargo, no obstante, pero |
| Causa | porque, ya que, debido a |
| Consecuencia | por lo tanto, en consecuencia |

> En la PAES, lee la oración completa y verifica que el conector respete la relación lógica **y** la concordancia.`,
      exercises: [
        {
          question:
            'Estudió toda la noche; ____, reprobó el examen. El conector adecuado es:',
          options: ['por lo tanto', 'sin embargo', 'porque', 'además'],
          correctOption: 1,
          explanation:
            'Hay un contraste entre el esfuerzo y el resultado: "sin embargo" expresa oposición.',
        },
        {
          question:
            'No asistió a clases ____ estaba enfermo. El conector causal correcto es:',
          options: ['aunque', 'porque', 'sin embargo', 'para que'],
          correctOption: 1,
          explanation:
            '"Porque" introduce la causa de la inasistencia.',
        },
        {
          question: 'El conector "por lo tanto" expresa una relación de:',
          options: ['Oposición', 'Consecuencia', 'Adición', 'Tiempo'],
          correctOption: 1,
          explanation:
            '"Por lo tanto" indica la consecuencia o conclusión derivada de lo anterior.',
        },
      ],
    },
    {
      title: 'Evaluación de textos argumentativos',
      xpReward: 70,
      theory: `# Textos argumentativos

Un texto argumentativo busca **persuadir** mediante una **tesis** sostenida por **argumentos**.

## Componentes
- **Tesis:** la postura que se defiende.
- **Argumentos:** razones que la apoyan.
- **Contraargumento:** objeción que se anticipa y refuta.

> Evaluar un argumento es juzgar si las razones realmente sostienen la tesis, no si estás de acuerdo con ella.`,
      exercises: [
        {
          question: 'En un texto argumentativo, la tesis corresponde a:',
          options: [
            'Un ejemplo anecdótico.',
            'La postura central que el autor defiende.',
            'Una cita de un experto.',
            'La conclusión narrativa.',
          ],
          correctOption: 1,
          explanation:
            'La tesis es la idea/postura que el autor defiende a lo largo del texto.',
        },
        {
          question:
            'Cuando un autor menciona una objeción ajena para luego rebatirla, utiliza:',
          options: ['Una tesis', 'Un contraargumento', 'Una metáfora', 'Un dato'],
          correctOption: 1,
          explanation:
            'Anticipar y refutar una objeción es usar un contraargumento, lo que fortalece la postura propia.',
        },
        {
          question: 'Evaluar la solidez de un argumento implica:',
          options: [
            'Verificar si las razones realmente apoyan la tesis.',
            'Comprobar si coincide con tu opinión.',
            'Contar las palabras del párrafo.',
            'Revisar la ortografía.',
          ],
          correctOption: 0,
          explanation:
            'La evaluación argumentativa juzga la pertinencia y suficiencia de las razones, con independencia de la opinión propia.',
        },
      ],
    },
  ],

  // --------------------------------------------------------------------------
  // MATEMÁTICA M1
  // --------------------------------------------------------------------------
  'matematica-m1': [
    {
      title: 'Números enteros y operatoria',
      xpReward: 50,
      theory: `# Números enteros

Los **enteros** ($\\mathbb{Z}$) incluyen positivos, negativos y el cero.

## Reglas de signos
- $(+)\\cdot(+) = +$
- $(-)\\cdot(-) = +$
- $(+)\\cdot(-) = -$

## Prioridad de operaciones
1. Paréntesis
2. Potencias
3. Multiplicación / división
4. Suma / resta

> Recuerda: **-3 - (-5) = -3 + 5 = 2**.`,
      exercises: [
        {
          question: '¿Cuánto es -7 + 12 - 5?',
          options: ['0', '-10', '10', '4'],
          correctOption: 0,
          explanation: '-7 + 12 = 5; luego 5 - 5 = 0.',
        },
        {
          question: '¿Cuál es el resultado de (-3) · (-4)?',
          options: ['-12', '12', '-7', '7'],
          correctOption: 1,
          explanation: 'Menos por menos da más: 3 · 4 = 12.',
        },
        {
          question: 'Resuelve 2 + 3 · 4 respetando la prioridad de operaciones.',
          options: ['20', '14', '24', '11'],
          correctOption: 1,
          explanation:
            'Primero la multiplicación: 3 · 4 = 12; luego 2 + 12 = 14.',
        },
      ],
    },
    {
      title: 'Fracciones y decimales',
      xpReward: 50,
      theory: `# Fracciones y decimales

Una **fracción** $\\frac{a}{b}$ representa $a$ partes de un total $b$.

## Sumar fracciones
Iguala denominadores: $\\frac{1}{2} + \\frac{1}{3} = \\frac{3}{6} + \\frac{2}{6} = \\frac{5}{6}$.

## Fracción a decimal
Divide el numerador por el denominador: $\\frac{3}{4} = 0{,}75$.`,
      exercises: [
        {
          question: '¿Cuánto es 1/2 + 1/4?',
          options: ['2/6', '3/4', '1/6', '2/4'],
          correctOption: 1,
          explanation: '1/2 = 2/4; 2/4 + 1/4 = 3/4.',
        },
        {
          question: 'El decimal equivalente a 3/5 es:',
          options: ['0,35', '0,6', '0,53', '1,67'],
          correctOption: 1,
          explanation: '3 ÷ 5 = 0,6.',
        },
        {
          question: '¿Cuánto es 2/3 de 90?',
          options: ['30', '45', '60', '120'],
          correctOption: 2,
          explanation: '90 ÷ 3 = 30; 30 · 2 = 60.',
        },
      ],
    },
    {
      title: 'Porcentajes',
      xpReward: 60,
      theory: `# Porcentajes

Un **porcentaje** es una fracción de denominador 100. El $x\\%$ de $N$ es $\\frac{x}{100}\\cdot N$.

## Trucos rápidos
- $10\\%$ de N → corre la coma una posición.
- Aumentar un $20\\%$ → multiplicar por $1{,}2$.
- Descontar un $20\\%$ → multiplicar por $0{,}8$.`,
      exercises: [
        {
          question: '¿Cuánto es el 25% de 200?',
          options: ['25', '50', '75', '100'],
          correctOption: 1,
          explanation: '25% = 1/4; 200 ÷ 4 = 50.',
        },
        {
          question:
            'Un producto cuesta $10.000 y sube un 20%. ¿Cuál es el nuevo precio?',
          options: ['$10.200', '$12.000', '$8.000', '$20.000'],
          correctOption: 1,
          explanation: 'Aumentar 20% es multiplicar por 1,2: 10.000 · 1,2 = 12.000.',
        },
        {
          question: 'Si 30 es el 60% de un número, ¿cuál es el número?',
          options: ['18', '50', '90', '40'],
          correctOption: 1,
          explanation: 'N = 30 ÷ 0,6 = 50.',
        },
      ],
    },
    {
      title: 'Ecuaciones de primer grado',
      xpReward: 60,
      theory: `# Ecuaciones lineales

Una ecuación de primer grado tiene la forma $ax + b = c$.

## Pasos
1. Agrupa las $x$ a un lado y los números al otro.
2. Despeja $x$ dividiendo por su coeficiente.

**Ejemplo:** $2x + 3 = 11 \\Rightarrow 2x = 8 \\Rightarrow x = 4$.`,
      exercises: [
        {
          question: 'Resuelve 3x - 6 = 9.',
          options: ['x = 1', 'x = 5', 'x = 3', 'x = 15'],
          correctOption: 1,
          explanation: '3x = 9 + 6 = 15; x = 15 ÷ 3 = 5.',
        },
        {
          question: 'Si 5x = 2x + 12, entonces x vale:',
          options: ['2', '4', '6', '12'],
          correctOption: 1,
          explanation: '5x - 2x = 12; 3x = 12; x = 4.',
        },
        {
          question: 'La solución de x/2 + 1 = 5 es:',
          options: ['x = 8', 'x = 10', 'x = 4', 'x = 12'],
          correctOption: 0,
          explanation: 'x/2 = 4; x = 8.',
        },
      ],
    },
    {
      title: 'Proporcionalidad',
      xpReward: 70,
      theory: `# Proporcionalidad

## Directa
Dos magnitudes son **directamente** proporcionales si al aumentar una, la otra aumenta en la misma razón: $\\frac{a}{b} = \\frac{c}{d}$.

## Inversa
Son **inversamente** proporcionales si al aumentar una, la otra disminuye: $a \\cdot b = k$.

> Regla de tres directa: $\\frac{a}{b} = \\frac{x}{d} \\Rightarrow x = \\frac{a\\cdot d}{b}$.`,
      exercises: [
        {
          question:
            'Si 4 lápices cuestan $800, ¿cuánto cuestan 7 lápices (proporcionalidad directa)?',
          options: ['$1.200', '$1.400', '$1.600', '$2.000'],
          correctOption: 1,
          explanation: 'Cada lápiz cuesta 800 ÷ 4 = 200; 200 · 7 = 1.400.',
        },
        {
          question:
            '6 obreros tardan 10 días en una obra. ¿Cuántos días tardarán 12 obreros (proporcionalidad inversa)?',
          options: ['20 días', '5 días', '12 días', '2 días'],
          correctOption: 1,
          explanation:
            'Inversa: 6 · 10 = 12 · x ⇒ x = 60 ÷ 12 = 5 días.',
        },
        {
          question:
            'En un mapa 2 cm representan 50 km. ¿Cuántos km representan 5 cm?',
          options: ['100 km', '125 km', '150 km', '250 km'],
          correctOption: 1,
          explanation: '50 ÷ 2 = 25 km por cm; 25 · 5 = 125 km.',
        },
      ],
    },
  ],

  // --------------------------------------------------------------------------
  // MATEMÁTICA M2
  // --------------------------------------------------------------------------
  'matematica-m2': [
    {
      title: 'Funciones lineales',
      xpReward: 60,
      theory: `# Función lineal

Una función lineal tiene la forma $f(x) = mx + n$, donde:
- $m$ es la **pendiente** (inclinación).
- $n$ es el **coeficiente de posición** (corte con el eje Y).

> Si $m > 0$ la recta crece; si $m < 0$ decrece.`,
      exercises: [
        {
          question: 'En f(x) = 3x - 2, la pendiente es:',
          options: ['-2', '3', '2', '1'],
          correctOption: 1,
          explanation: 'La pendiente es el coeficiente que acompaña a x: m = 3.',
        },
        {
          question: 'Evalúa f(x) = 2x + 5 en x = 4.',
          options: ['9', '13', '20', '7'],
          correctOption: 1,
          explanation: 'f(4) = 2·4 + 5 = 8 + 5 = 13.',
        },
        {
          question: '¿Dónde corta al eje Y la recta f(x) = -x + 6?',
          options: ['(0, 6)', '(6, 0)', '(0, -6)', '(-1, 0)'],
          correctOption: 0,
          explanation: 'El corte con el eje Y ocurre en x = 0: f(0) = 6, punto (0, 6).',
        },
      ],
    },
    {
      title: 'Función cuadrática',
      xpReward: 70,
      theory: `# Función cuadrática

Forma general: $f(x) = ax^2 + bx + c$. Su gráfico es una **parábola**.

- Si $a > 0$ abre hacia arriba (mínimo).
- Si $a < 0$ abre hacia abajo (máximo).
- Vértice: $x_v = -\\dfrac{b}{2a}$.`,
      exercises: [
        {
          question: 'La parábola f(x) = -2x² + 3x + 1 abre hacia:',
          options: ['Arriba', 'Abajo', 'La derecha', 'La izquierda'],
          correctOption: 1,
          explanation: 'Como a = -2 < 0, la parábola abre hacia abajo.',
        },
        {
          question: 'El eje de simetría de f(x) = x² - 4x + 3 está en x =',
          options: ['1', '2', '3', '4'],
          correctOption: 1,
          explanation: 'x_v = -b/(2a) = 4/(2·1) = 2.',
        },
        {
          question: 'Una raíz de f(x) = x² - 9 es:',
          options: ['x = 9', 'x = 3', 'x = -9', 'x = 1'],
          correctOption: 1,
          explanation: 'x² - 9 = 0 ⇒ x² = 9 ⇒ x = 3 (o x = -3).',
        },
      ],
    },
    {
      title: 'Teorema de Pitágoras y trigonometría',
      xpReward: 70,
      theory: `# Pitágoras y razones trigonométricas

En un triángulo rectángulo: $c^2 = a^2 + b^2$ (c es la hipotenusa).

## Razones
- $\\sin\\theta = \\dfrac{\\text{cateto opuesto}}{\\text{hipotenusa}}$
- $\\cos\\theta = \\dfrac{\\text{cateto adyacente}}{\\text{hipotenusa}}$
- $\\tan\\theta = \\dfrac{\\text{opuesto}}{\\text{adyacente}}$`,
      exercises: [
        {
          question:
            'En un triángulo rectángulo los catetos miden 3 y 4. ¿Cuánto mide la hipotenusa?',
          options: ['5', '6', '7', '12'],
          correctOption: 0,
          explanation: 'c² = 3² + 4² = 9 + 16 = 25 ⇒ c = 5.',
        },
        {
          question: 'El valor de sin(30°) es:',
          options: ['1', '0,5', '0,87', '0'],
          correctOption: 1,
          explanation: 'sin(30°) = 1/2 = 0,5.',
        },
        {
          question:
            'Si en un triángulo rectángulo el cateto opuesto mide 6 y la hipotenusa 10, sin(θ) =',
          options: ['0,6', '0,8', '1,67', '0,4'],
          correctOption: 0,
          explanation: 'sin(θ) = opuesto/hipotenusa = 6/10 = 0,6.',
        },
      ],
    },
    {
      title: 'Estadística: medidas de tendencia',
      xpReward: 70,
      theory: `# Medidas de tendencia central

- **Media:** promedio (suma ÷ cantidad).
- **Mediana:** valor central de los datos ordenados.
- **Moda:** valor que más se repite.

> Con datos atípicos extremos, la mediana representa mejor el "centro" que la media.`,
      exercises: [
        {
          question: '¿Cuál es la media de 4, 6, 8, 10?',
          options: ['6', '7', '8', '28'],
          correctOption: 1,
          explanation: '(4+6+8+10)/4 = 28/4 = 7.',
        },
        {
          question: 'La mediana de 3, 5, 9, 11, 12 es:',
          options: ['5', '9', '8', '11'],
          correctOption: 1,
          explanation:
            'Con 5 datos ordenados, la mediana es el valor central: 9.',
        },
        {
          question: 'La moda del conjunto 2, 3, 3, 5, 7 es:',
          options: ['2', '3', '5', '7'],
          correctOption: 1,
          explanation: 'El valor que más se repite es 3.',
        },
      ],
    },
  ],

  // --------------------------------------------------------------------------
  // HISTORIA
  // --------------------------------------------------------------------------
  historia: [
    {
      title: 'Pueblos originarios de Chile',
      xpReward: 50,
      theory: `# Pueblos originarios

Antes de la llegada de los españoles, el territorio chileno estaba habitado por diversos pueblos:
- **Aymaras y atacameños** en el norte.
- **Mapuche** en la zona centro-sur (el más numeroso).
- **Selk'nam y yámanas** en el extremo austral.

> El pueblo **mapuche** resistió la conquista española durante siglos al sur del río Biobío.`,
      exercises: [
        {
          question: 'El pueblo originario más numeroso de la zona centro-sur era:',
          options: ['Aymara', 'Mapuche', 'Selk’nam', 'Atacameño'],
          correctOption: 1,
          explanation:
            'Los mapuche habitaban la zona centro-sur y eran el pueblo más numeroso.',
        },
        {
          question: 'Los pueblos atacameños y aymaras habitaban principalmente:',
          options: [
            'El extremo austral',
            'El norte de Chile',
            'La Patagonia',
            'La isla de Chiloé',
          ],
          correctOption: 1,
          explanation:
            'Aymaras y atacameños se ubicaban en el norte, adaptados a la vida en el altiplano y oasis.',
        },
        {
          question:
            'El río que marcó la frontera de la resistencia mapuche frente a los españoles fue el:',
          options: ['Río Maipo', 'Río Biobío', 'Río Loa', 'Río Maule'],
          correctOption: 1,
          explanation:
            'El río Biobío fue la frontera histórica entre el dominio español y el territorio mapuche.',
        },
      ],
    },
    {
      title: 'Independencia de Chile',
      xpReward: 60,
      theory: `# Independencia de Chile (1810–1823)

- **Primera Junta de Gobierno:** 18 de septiembre de 1810.
- **Patria Vieja, Reconquista y Patria Nueva** son las tres etapas.
- **Batalla de Chacabuco (1817)** y **Maipú (1818)** sellaron la independencia.

> Bernardo O'Higgins y José de San Martín lideraron el Ejército de los Andes.`,
      exercises: [
        {
          question: 'La Primera Junta Nacional de Gobierno se formó el:',
          options: [
            '12 de febrero de 1818',
            '18 de septiembre de 1810',
            '5 de abril de 1818',
            '21 de mayo de 1879',
          ],
          correctOption: 1,
          explanation:
            'La Primera Junta de Gobierno se constituyó el 18 de septiembre de 1810.',
        },
        {
          question:
            'La batalla que aseguró definitivamente la independencia de Chile en 1818 fue:',
          options: ['Rancagua', 'Chacabuco', 'Maipú', 'Yungay'],
          correctOption: 2,
          explanation:
            'La Batalla de Maipú (5 de abril de 1818) consolidó la independencia.',
        },
        {
          question:
            'El líder que cruzó los Andes junto a O’Higgins con el Ejército Libertador fue:',
          options: [
            'Manuel Rodríguez',
            'José de San Martín',
            'Diego Portales',
            'Arturo Prat',
          ],
          correctOption: 1,
          explanation:
            'José de San Martín lideró, junto a O’Higgins, el Ejército de los Andes.',
        },
      ],
    },
    {
      title: 'Formación ciudadana y democracia',
      xpReward: 60,
      theory: `# Democracia y derechos

La **democracia** se basa en la soberanía popular y el respeto a los derechos humanos.

## Principios
- Separación de poderes: **Ejecutivo, Legislativo y Judicial**.
- Estado de derecho: todos sometidos a la ley.
- Participación ciudadana: voto, organización y libertad de expresión.`,
      exercises: [
        {
          question: 'Los tres poderes del Estado en Chile son:',
          options: [
            'Ejecutivo, Legislativo y Judicial',
            'Presidente, Senado y Pueblo',
            'Civil, Militar y Religioso',
            'Nacional, Regional y Comunal',
          ],
          correctOption: 0,
          explanation:
            'La separación de poderes distingue Ejecutivo, Legislativo y Judicial.',
        },
        {
          question:
            'El principio según el cual todas las personas, incluidas las autoridades, están sometidas a la ley se llama:',
          options: [
            'Soberanía',
            'Estado de derecho',
            'Federalismo',
            'Plebiscito',
          ],
          correctOption: 1,
          explanation:
            'El Estado de derecho implica que nadie está por encima de la ley.',
        },
        {
          question: 'Una forma de participación ciudadana es:',
          options: [
            'El sufragio en elecciones',
            'La evasión de impuestos',
            'La censura de prensa',
            'La concentración del poder',
          ],
          correctOption: 0,
          explanation:
            'El voto (sufragio) es una forma fundamental de participación democrática.',
        },
      ],
    },
    {
      title: 'Economía y sociedad',
      xpReward: 70,
      theory: `# Conceptos económicos básicos

- **Oferta y demanda** determinan los precios en un mercado.
- **PIB:** valor de todos los bienes y servicios producidos en un país.
- **Inflación:** alza sostenida y generalizada de los precios.

> Cuando la demanda sube y la oferta se mantiene, el precio tiende a subir.`,
      exercises: [
        {
          question: 'La inflación se define como:',
          options: [
            'El aumento del empleo',
            'El alza sostenida y generalizada de los precios',
            'La caída del PIB',
            'El aumento de las exportaciones',
          ],
          correctOption: 1,
          explanation:
            'La inflación es el alza sostenida y generalizada del nivel de precios.',
        },
        {
          question: 'El PIB mide:',
          options: [
            'La población de un país',
            'El valor de los bienes y servicios producidos',
            'La cantidad de impuestos',
            'El número de empresas',
          ],
          correctOption: 1,
          explanation:
            'El Producto Interno Bruto mide el valor de la producción de un país en un período.',
        },
        {
          question:
            'Si la demanda de un producto aumenta y la oferta se mantiene constante, el precio tiende a:',
          options: ['Bajar', 'Subir', 'Mantenerse igual', 'Desaparecer'],
          correctOption: 1,
          explanation:
            'Mayor demanda con oferta fija presiona los precios al alza.',
        },
      ],
    },
  ],

  // --------------------------------------------------------------------------
  // CIENCIAS
  // --------------------------------------------------------------------------
  ciencias: [
    {
      title: 'La célula',
      xpReward: 50,
      theory: `# La célula

La **célula** es la unidad básica de la vida.

## Tipos
- **Procariontes:** sin núcleo definido (bacterias).
- **Eucariontes:** con núcleo (animales, plantas, hongos).

## Organelos clave
- **Mitocondria:** produce energía (ATP).
- **Cloroplasto:** fotosíntesis (solo en plantas).
- **Núcleo:** contiene el ADN.`,
      exercises: [
        {
          question: 'El organelo encargado de producir energía (ATP) es:',
          options: ['Núcleo', 'Mitocondria', 'Ribosoma', 'Cloroplasto'],
          correctOption: 1,
          explanation:
            'La mitocondria realiza la respiración celular y produce ATP.',
        },
        {
          question: 'Una célula sin núcleo definido es de tipo:',
          options: ['Eucarionte', 'Procarionte', 'Vegetal', 'Nerviosa'],
          correctOption: 1,
          explanation:
            'Las células procariontes (como las bacterias) carecen de núcleo definido.',
        },
        {
          question: 'El cloroplasto se encuentra principalmente en células:',
          options: ['Animales', 'Vegetales', 'Bacterianas', 'Sanguíneas'],
          correctOption: 1,
          explanation:
            'El cloroplasto, responsable de la fotosíntesis, está presente en células vegetales.',
        },
      ],
    },
    {
      title: 'Cuerpo humano y sistemas',
      xpReward: 60,
      theory: `# Sistemas del cuerpo humano

- **Circulatorio:** transporta sangre, nutrientes y oxígeno (corazón).
- **Respiratorio:** intercambio de gases (pulmones).
- **Digestivo:** procesa los alimentos.
- **Nervioso:** coordina y controla (cerebro, médula).`,
      exercises: [
        {
          question: 'El órgano principal del sistema circulatorio es:',
          options: ['Pulmón', 'Corazón', 'Estómago', 'Hígado'],
          correctOption: 1,
          explanation:
            'El corazón bombea la sangre a través del sistema circulatorio.',
        },
        {
          question: 'El intercambio de oxígeno y dióxido de carbono ocurre en:',
          options: [
            'El estómago',
            'Los pulmones (alvéolos)',
            'Los riñones',
            'El cerebro',
          ],
          correctOption: 1,
          explanation:
            'El intercambio gaseoso ocurre en los alvéolos pulmonares.',
        },
        {
          question: 'El sistema encargado de coordinar y controlar el cuerpo es el:',
          options: ['Digestivo', 'Nervioso', 'Excretor', 'Óseo'],
          correctOption: 1,
          explanation:
            'El sistema nervioso coordina y controla las funciones del organismo.',
        },
      ],
    },
    {
      title: 'Física: fuerza y movimiento',
      xpReward: 60,
      theory: `# Fuerza y movimiento

## Leyes de Newton
1. **Inercia:** un cuerpo mantiene su estado si no actúa una fuerza neta.
2. **F = m · a:** la fuerza es masa por aceleración.
3. **Acción y reacción:** a toda acción corresponde una reacción.

> Velocidad = distancia / tiempo. La aceleración mide el cambio de velocidad.`,
      exercises: [
        {
          question: 'Según la segunda ley de Newton, la fuerza se calcula como:',
          options: ['F = m/a', 'F = m · a', 'F = a/m', 'F = m + a'],
          correctOption: 1,
          explanation: 'La segunda ley de Newton establece F = m · a.',
        },
        {
          question:
            'Un auto recorre 100 km en 2 horas. Su rapidez media es:',
          options: ['200 km/h', '50 km/h', '102 km/h', '98 km/h'],
          correctOption: 1,
          explanation: 'Rapidez = distancia/tiempo = 100/2 = 50 km/h.',
        },
        {
          question:
            'La tendencia de un cuerpo a mantener su estado de reposo o movimiento se llama:',
          options: ['Aceleración', 'Inercia', 'Gravedad', 'Fricción'],
          correctOption: 1,
          explanation:
            'La primera ley de Newton describe la inercia.',
        },
      ],
    },
    {
      title: 'Química: la materia',
      xpReward: 70,
      theory: `# La materia y la tabla periódica

La **materia** está formada por átomos. Un **elemento** está hecho de un solo tipo de átomo.

## Estados de la materia
- Sólido, líquido, gaseoso (y plasma).

## Tabla periódica
- Organiza los elementos por **número atómico** (cantidad de protones).
- Ejemplos: H (hidrógeno), O (oxígeno), Na (sodio).`,
      exercises: [
        {
          question: 'El número atómico de un elemento corresponde a la cantidad de:',
          options: ['Neutrones', 'Protones', 'Electrones de valencia', 'Moléculas'],
          correctOption: 1,
          explanation:
            'El número atómico es la cantidad de protones del núcleo.',
        },
        {
          question: 'El símbolo químico del sodio es:',
          options: ['So', 'Na', 'S', 'Sn'],
          correctOption: 1,
          explanation: 'El sodio se representa con el símbolo Na.',
        },
        {
          question:
            'El paso de estado líquido a gaseoso se denomina:',
          options: ['Fusión', 'Evaporación', 'Solidificación', 'Condensación'],
          correctOption: 1,
          explanation:
            'El cambio de líquido a gas se llama evaporación (o vaporización).',
        },
      ],
    },
  ],
}

// ----------------------------------------------------------------------------
// Build flat Level[] and Exercise[] arrays with stable ids.
// ----------------------------------------------------------------------------

const LEVELS: Level[] = []
const EXERCISES: Exercise[] = []

for (const [subjectId, rawLevels] of Object.entries(SUBJECT_LEVELS)) {
  rawLevels.forEach((raw, levelIdx) => {
    const levelId = `${subjectId}-L${levelIdx + 1}`
    const exerciseIds: string[] = []

    raw.exercises.forEach((ex, exIdx) => {
      const exId = `${levelId}-E${exIdx + 1}`
      exerciseIds.push(exId)
      EXERCISES.push({
        id: exId,
        levelId,
        question: ex.question,
        options: ex.options,
        correctOption: ex.correctOption,
        explanation: ex.explanation,
      })
    })

    LEVELS.push({
      id: levelId,
      subjectId: subjectId as Level['subjectId'],
      order: levelIdx + 1,
      title: raw.title,
      theory_content_md: raw.theory,
      exerciseIds,
      xpReward: raw.xpReward,
    })
  })
}

export { LEVELS, EXERCISES }

export const getLevelsBySubject = (subjectId: string): Level[] =>
  LEVELS.filter((l) => l.subjectId === subjectId).sort((a, b) => a.order - b.order)

export const getLevel = (levelId: string): Level | undefined =>
  LEVELS.find((l) => l.id === levelId)

export const getExercise = (exerciseId: string): Exercise | undefined =>
  EXERCISES.find((e) => e.id === exerciseId)

export const getExercisesByLevel = (levelId: string): Exercise[] =>
  LEVELS.find((l) => l.id === levelId)
    ?.exerciseIds.map((id) => getExercise(id))
    .filter((e): e is Exercise => Boolean(e)) ?? []
