// Real data for Jean-Philippe Mouton's site, extracted from ORCID XML export.
// Papers: 24 unique (deduped by DOI) from Zenodo, 2025-2026.
// Plus: thèse 1997 Russell, livre 2012 Fonctions.

// Helper: group into thematic series (FR first title wins).
// Series identified by title prefix patterns.
const PAPERS = [
  // EMV — Voynich
  { series:'emv', track:'v1', title:"Une exploration statistique du manuscrit de Voynich : synthèse, contraintes formelles, hypothèses et tests",
    titleEn:"A statistical exploration of the Voynich manuscript: synthesis, formal constraints, hypotheses and tests",
    year:2026, month:4, ord:1, doi:"10.5281/zenodo.19655819", codeZip:"https://zenodo.org/records/19655819/files/EMV-I-v1-code.zip", type:"preprint", short:"EMV I", version:"1.0", rg:"https://www.researchgate.net/publication/403995940",
    tags:["Voynich","Beinecke MS 408","EVA","entropie","morphologie","grammaire syllabique","sandhi","prosodie","Quattrocento"],
    abstract: {
      fr: "Cet article présente les résultats d'une exploration statistique systématique du manuscrit de Voynich (Beinecke MS 408, XVᵉ siècle), conduite sur la transcription EVA de Takahashi via le fichier interlinéaire Landini–Stolfi (33 695 mots, 4 117 lignes). L'analyse mobilise plus de cent vingt tests indépendants, organisés en douze chantiers méthodologiques : entropie conditionnelle, morphologie préfixe-radical-suffixe, grammaire syllabique, structure positionnelle de ligne, transitions inter-mots, automates probabilistes, comparaison typologique à une dizaine de corpus de contrôle, prosodie et grammaire compositionnelle.\n\nLe travail ne propose aucun déchiffrement et n'identifie aucune langue. Il établit un faisceau de douze contraintes formelles — six principales (entropie, paradigme morphologique, grammaire syllabique, structure positionnelle, absence de syntaxe corrélative, combinatoire des bigrammes) et six complémentaires (sandhi bidirectionnel, clausule métrique, alternance rythmique à trois poids, couplage préfixe-métrique, grammaire compositionnelle, spécialisation scribale) — qu'un éventuel déchiffrement futur devra reproduire pour être recevable. Les hypothèses publiées (Bax, Cheshire, Rugg, Tucker & Talbert, Timm & Schinner, Greshko, etc.) sont systématiquement confrontées à ces contraintes.\n\nLa lecture privilégiée s'organise autour d'un modèle à deux étages (substrat porteur de signal, plus transformation scribale autonome modulée par le domaine). À la lumière des chantiers prosodiques et compositionnels, le voynichois apparaît compatible avec la transcription écrite d'une tradition versifiée à métrique autonome. Les engagements historiques plus spécifiques (contenu pharmaco-botanique, origine orale, localisation au Quattrocento italien) sont inférés par recoupement iconographique et contextuel, non par les tests statistiques eux-mêmes. Aucune tradition connue ne reproduit simultanément toutes les signatures mesurées, mais plusieurs candidats (ghazal persan, śloka sanskrit, traditions documentaires à chapitres indépendants) partagent des traits saillants.",
      en: "This paper presents the results of a systematic statistical exploration of the Voynich manuscript (Beinecke MS 408, 15th century), conducted on the Takahashi EVA transcription through the Landini–Stolfi interlinear file (33,695 words, 4,117 lines). The analysis draws on more than one hundred and twenty independent tests, organised into twelve methodological strands: conditional entropy, prefix-stem-suffix morphology, syllabic grammar, line-positional structure, inter-word transitions, probabilistic automata, typological comparison with about ten control corpora, prosody and compositional grammar.\n\nThe work proposes no decipherment and identifies no language. It establishes a bundle of twelve formal constraints — six main (entropy, morphological paradigm, syllabic grammar, positional structure, absence of correlative syntax, bigram combinatorics) and six complementary (bidirectional sandhi, metrical clausula, three-weight rhythmic alternation, prefix-metrical coupling, compositional grammar, scribal specialisation) — that any future decipherment must reproduce to be admissible. Published hypotheses (Bax, Cheshire, Rugg, Tucker & Talbert, Timm & Schinner, Greshko, etc.) are systematically confronted with these constraints.\n\nThe preferred reading is organised around a two-layer model (a signal-bearing substrate plus an autonomous domain-modulated scribal transformation). In light of the prosodic and compositional strands, Voynichese appears compatible with the written transcription of a versified tradition with an autonomous metre. More specific historical commitments (pharmaco-botanical content, oral origin, Italian Quattrocento localisation) are inferred by iconographic and contextual cross-referencing, not by the statistical tests themselves. No known tradition simultaneously reproduces all measured signatures, but several candidates (Persian ghazal, Sanskrit śloka, traditions with independent-chapter documentation) share salient features."
   , langs:["FR"] } },

  // TGSE v2 — CHANTIER ACTIF (en cours de rédaction, remplace progressivement v1)
  { series:'tgse', track:'v2', title:"Théorie générale des structures émergentes — Propédeutique mathématique — Première partie — Arithmétique graduée : fondements, unicité et construction",
    titleEn:"General theory of emergent structures — Mathematical propaedeutic — Part one — Graduated arithmetic: foundations, uniqueness and construction — Applications to optimization on graphs and to reliability theory",
    year:2026, month:4, ord:1, doi:"10.5281/zenodo.19423009", type:"preprint", short:"Propédeutique I", overhaul:true, rg:"https://www.researchgate.net/publication/403514132", langs:["FR","EN"],
    msc:["16Y60","05C85","37F10","03B52","06D30","60K10"],
    abstract: {
      fr: "Nous introduisons et étudions l'ensemble des nombres gradués, où chaque nombre réel est muni d'un degré d'existence dans l'intervalle $(0,1]$, complété par un élément représentant l'inexistence. Nous démontrons que les opérations fondamentales — le produit des degrés pour la propagation et la consolidation par la formule probabiliste pour la fusion de sources indépendantes — sont les uniques polynômes satisfaisant leurs axiomes respectifs (théorèmes de rigidité). Ces deux opérations sont liées par une dualité de De Morgan, formant l'unique algèbre de De Morgan polynomiale sur $[0,1]$.\n\nNous donnons une construction explicite par produit tensoriel de suites pondérées qui résout un défaut de fondation des constructions par suites lacunaires, et nous établissons l'unicité de la structure : il existe, à isomorphisme unique près, un seul semi-anneau gradué complet satisfaisant cinq axiomes mutuellement indépendants. La structure est totalement rigide : son seul automorphisme continu est l'identité, et la consolidation fixe l'échelle des degrés.\n\nDeux applications illustrent le formalisme : l'extension de l'algorithme de Dijkstra aux réseaux à fiabilité graduée avec redondance de chemins, et la géométrie des systèmes dynamiques gradués (ensemble de Mandelbrot à degrés d'existence variables).",
      en: "We introduce and study the set of graduated numbers, where each real number carries a degree of existence in the interval $(0,1]$, completed by an element representing nonexistence. We prove that the fundamental operations — the product of degrees for propagation and the probabilistic formula for independent source fusion — are the unique polynomials satisfying their respective axioms (rigidity theorems). These two operations are related by a De Morgan duality, forming the unique polynomial De Morgan algebra on $[0,1]$.\n\nWe give an explicit construction by tensor product of weighted sequences that resolves a foundational defect of lacunary-sequence constructions, and we establish uniqueness of the structure: there exists, up to unique isomorphism, a single complete graduated semiring satisfying five mutually independent axioms. The structure is totally rigid: its only continuous automorphism is the identity, and consolidation fixes the scale of degrees.\n\nTwo applications illustrate the formalism: the extension of Dijkstra's algorithm to networks with graduated reliability and path redundancy, and the geometry of graduated dynamical systems (Mandelbrot set with variable degrees of existence)."
    } },
  { series:'tgse', track:'v2', title:"Théorie générale des structures émergentes — Propédeutique mathématique — Deuxième partie — Arithmétique à graduation hyperréelle : le noyau de l'ombre",
    titleEn:"General theory of emergent structures — Mathematical propaedeutic — Part two — Hyperreal-graduated arithmetic: the shadow kernel — Applications to regularization of divergent series and to phenomenological quantum modeling",
    year:2026, month:4, ord:2, doi:"10.5281/zenodo.19517465", type:"preprint", short:"Propédeutique II", overhaul:true, rg:"https://www.researchgate.net/publication/403734338", langs:["FR","EN"],
    msc:["26E35","16Y60","06D30","40A05","11M06","14L05","81P40","62B10"],
    abstract: {
      fr: "Nous construisons l'extension non standard de l'arithmétique graduée de TGSE I par ultrapuissance de Robinson, et nous étudions le morphisme ombre $\\sigma$ qui projette le monde non standard sur le monde standard. Le sujet central de cet article est le noyau du morphisme ombre, c'est-à-dire l'ensemble des éléments invisibles au monde standard.\n\nL'article repose sur trois résultats principaux : (1) l'asymétrie fondamentale — le noyau est un idéal pour la propagation mais pas pour la consolidation, ce qui rend l'émergence mathématiquement stable ; (2) l'espace tangent au néant, isomorphe aux réels, sur lequel l'obstruction à la dérivation de TGSE I disparaît ; (3) le critère de sortie par consolidation avec horizon vide — les éléments du noyau sont soit confinés (masse infinitésimale) soit évadés (masse appréciable), sans position intermédiaire.\n\nNous démontrons que le noyau possède une filtration par profondeur dont la valuation est tropicale, et que la fibre d'émergence au-dessus de chaque élément du monde standard est non triviale : l'émergence ne laisse pas de trace. Le morphisme ombre est un morphisme pour l'addition et la multiplication graduées sans restriction, mais pour la consolidation seulement sur les valeurs limitées : le défaut de morphicité, égal au moment de l'invisible divisé par le degré du visible, caractérise exactement la partie résistante du noyau.\n\nDeux applications illustrent le formalisme : la régularisation des séries divergentes par partie finie (dualité zêta–Lebesgue) et un modèle de décohérence quantique reformulé comme projection par le morphisme ombre. Une connexion avec la théorie de Lubin–Tate et la correspondance de Langlands locale pour $\\mathrm{GL}(1)$ est établie : la consolidation est le groupe formel multiplicatif, et la filtration par hauteur des groupes formels ouvre une perspective vers la théorie de l'homotopie chromatique.\n\nUn théorème de nécessité montre que les axiomes d'existence graduée, combinés à la non-commutativité des endomorphismes, forcent l'espace de Minkowski $(1,3)$ comme unique espace de degrés de dimension minimale : la signature $(1,3)$ est une conséquence de la classification de Jordan–von Neumann–Wigner, pas une entrée.",
      en: "We construct the nonstandard extension of the graduated arithmetic of TGSE I by Robinson ultrapower, and we study the shadow morphism $\\sigma$ that projects the nonstandard world onto the standard world. The central subject of this article is the kernel of the shadow morphism, that is, the set of elements invisible to the standard world.\n\nThe article rests on three main results: (1) the fundamental asymmetry — the kernel is an ideal for propagation but not for consolidation, which makes emergence mathematically stable; (2) the tangent space at nothingness, isomorphic to the reals, on which the derivation obstruction of TGSE I disappears; (3) the exit criterion by consolidation with empty horizon — the elements of the kernel are either confined (infinitesimal mass) or escapees (appreciable mass), with no intermediate position.\n\nWe prove that the kernel possesses a depth filtration whose valuation is tropical, and that the emergence fiber above each element of the standard world is nontrivial: emergence leaves no trace. The shadow morphism is a morphism for graduated addition and multiplication without restriction, but for consolidation only on limited values: the morphism defect, equal to the moment of the invisible divided by the degree of the visible, characterizes exactly the resistant part of the kernel.\n\nTwo applications illustrate the formalism: the regularization of divergent series by finite part (zeta–Lebesgue duality) and a quantum decoherence model reformulated as projection by the shadow morphism. A connection with Lubin–Tate theory and the local Langlands correspondence for $\\mathrm{GL}(1)$ is established: consolidation is the multiplicative formal group, and the height filtration of formal groups opens a perspective toward chromatic homotopy theory.\n\nA necessity theorem shows that the axioms of graduated existence, combined with the non-commutativity of endomorphisms, force Minkowski space $(1,3)$ as the unique space of degrees of minimal dimension: the signature $(1,3)$ is a consequence of the Jordan–von Neumann–Wigner classification, not an input."
    } },

  // TGSE v1 — série complète (sera progressivement révisée par v2)
  { series:'tgse', track:'v1', title:"Théorie ∞-catégorique des cascades d'émergence via correspondances", year:2026, month:3, ord:10, doi:"10.5281/zenodo.19102279", type:"preprint", short:"TGSE X", langs:["FR"], rg:"https://www.researchgate.net/publication/402748641" },
  { series:'tgse', track:'v1', title:"Théorie générale des structures émergentes — Formalisme mathématique pour les phénomènes d'émergence — Troisième partie — Structures Cohomologiques & Catégoriques : Cohomologie Graduée, Topos Élémentaire & Dualité de Hopf", year:2025, month:8, ord:9, doi:"10.5281/zenodo.16733427", type:"preprint", short:"TGSE IX", langs:["FR"], rg:"https://www.researchgate.net/publication/394259231" },
  { series:'tgse', track:'v1', title:"Théorie générale des structures émergentes — Formalisme mathématique unifié — Deuxième partie — Théorie des interactions inter-niveaux, théorèmes fondamentaux et structure catégorique", year:2025, month:7, ord:8, doi:"10.5281/zenodo.15865569", type:"preprint", short:"TGSE VIII", langs:["FR"], rg:"https://www.researchgate.net/publication/394227058" },
  { series:'tgse', track:'v1', title:"Théorie générale des structures émergentes — Formalisme mathématique unifié — Première partie — Applications à l'émergence de l'atome d'hydrogène et de l'espace-temps gravitationnel", year:2025, month:7, ord:7, doi:"10.5281/zenodo.15831158", type:"preprint", short:"TGSE VII", langs:["FR"], rg:"https://www.researchgate.net/publication/394226106" },



  // ORA — Opérateur de Résonance Arithmétique
  { series:'ora', track:'v1', title:"L'Opérateur de Résonance Arithmétique  : vers une approche géométrique des nombres premiers",
    titleEn:"The Arithmetic Resonance Operator: towards a geometric approach to prime numbers",
    year:2025, month:6, ord:1, doi:"10.5281/zenodo.15649784", type:"preprint", short:"ORA I", langs:["FR"], rg:"https://www.researchgate.net/publication/394194082",
    msc:["11A41","11N05","11N37","42A16","58A05","37A45","11M06"],
    tags:["nombres premiers","analyse harmonique","hypertore","phases logarithmiques","résonance arithmétique"],
    abstract: {
      fr: "On introduit l'Opérateur de Résonance Arithmétique (ORA), une fonction O(x) construite comme moyenne pondérée, sur k = 1 … K, des termes log(kx)·sin²(π log(kx)) avec un poids gaussien en log k. Cet opérateur réalise une transformation des entiers vers un espace de phases logarithmiques sur l'hypertore T^K, où émergent des motifs géométriques corrélés à la structure multiplicative des nombres.\n\nOn établit les propriétés analytiques fondamentales de O(x) — régularité C∞, comportement asymptotique, décomposition harmonique, caractérisation des minima par alignement des phases. Une validation numérique exploratoire sur [2, 2×10⁶] révèle une discrimination statistique remarquable : les nombres premiers sont surreprésentés d'un facteur 4,48 aux minima locaux, tandis que les nombres composés dominent aux maxima avec des amplitudes sensiblement plus élevées.\n\nSix conjectures fondamentales sont formulées, reliant la géométrie de l'hyperspirale arithmétique aux propriétés des entiers — premiers en particulier. Il s'agit d'un travail exploratoire : les observations, bien que statistiquement significatives, demandent à être validées à plus grande échelle. Ces résultats préliminaires ouvrent une perspective d'étude de la distribution des premiers par analyse harmonique multidimensionnelle et géométrie différentielle.",
      en: "We introduce the Arithmetic Resonance Operator (ARO), a function O(x) built as a weighted average over k = 1 … K of terms log(kx)·sin²(π log(kx)) with a Gaussian weight in log k. The operator maps the integers into a logarithmic phase space on the hypertorus T^K, where geometric patterns emerge in correlation with the multiplicative structure of numbers.\n\nThe fundamental analytic properties of O(x) are established: C∞ regularity, asymptotic behaviour, harmonic decomposition, and a characterisation of its minima by log-phase alignment. An exploratory numerical validation on [2, 2×10⁶] reveals a striking statistical discrimination: primes are over-represented by a factor 4.48 at local minima, whereas composite numbers dominate the maxima with noticeably larger amplitudes.\n\nSix fundamental conjectures are stated, relating the geometry of the arithmetic hyperspiral to properties of integers — primes in particular. This is exploratory work: the observations, though statistically significant, need validation at larger scale. These preliminary results open a path to the study of prime distribution via multi-dimensional harmonic analysis and differential geometry."
    } },
  { series:'ora', track:'v1', title:"L'Opérateur de Résonance Arithmétique  : fondements théoriques et structures quasi-cristallines dans l'espace des phases logarithmiques",
    titleEn:"The Arithmetic Resonance Operator: theoretical foundations and quasi-crystalline structures in logarithmic phase space",
    year:2025, month:6, ord:2, doi:"10.5281/zenodo.15650103", type:"preprint", short:"ORA II", langs:["FR"], rg:"https://www.researchgate.net/publication/394194556",
    msc:["11A41","11N05","11N37","42A16","37A45"],
    tags:["ORAP","ORAC","quasi-cristaux arithmétiques","auto-résonance","phases logarithmiques","théorème de Baker","équidistribution de Weyl"],
    abstract: {
      fr: "On établit les fondements théoriques de l'Opérateur de Résonance Arithmétique introduit dans l'article précédent. Deux extensions sont développées : l'ORAP (ORA restreint aux premiers), qui met au jour un mécanisme d'auto-résonance expliquant l'affinité géométrique entre nombres premiers et minima locaux, et l'ORAC (ORA continu), qui fournit le cadre analytique propre à l'investigation théorique.\n\nLa contribution centrale est un théorème de structure : l'ensemble des minima locaux de O(x) forme un quasi-cristal dans l'espace des phases logarithmiques T^K. La démonstration combine le théorème de Baker sur l'indépendance linéaire des logarithmes de premiers et une extension du théorème d'équidistribution de Weyl aux mesures arithmétiques. On obtient ainsi un cadre unifié pour penser la distribution des premiers comme un ordre non périodique à longue portée.",
      en: "We establish the theoretical foundations of the Arithmetic Resonance Operator introduced in the previous article. Two extensions are developed: ARO-P (restricted to primes), which exposes a self-resonance mechanism explaining the geometric affinity between primes and local minima, and ARO-C (continuous ARO), which provides the analytic framework for theoretical investigation.\n\nThe central contribution is a structural theorem: the set of local minima of O(x) forms a quasi-crystal in the logarithmic phase space T^K. The proof combines Baker's theorem on the linear independence of logarithms of primes with an extension of Weyl's equidistribution theorem to arithmetic measures. This yields a unified framework for viewing the distribution of primes as a long-range non-periodic order."
    } },
  { series:'ora', track:'v1', title:"Une approche variationnelle de l'hypothèse de Riemann via la rencontre de la théorie générale des structures émergentes et de l'opérateur de résonance arithmétique",
    titleEn:"A variational approach to the Riemann hypothesis via the meeting of the General Theory of Emergent Structures and the Arithmetic Resonance Operator",
    year:2025, month:7, ord:3, doi:"10.5281/zenodo.16411921", type:"preprint", short:"ORA ∩ TGSE", langs:["FR"], rg:"https://www.researchgate.net/publication/394253664",
    msc:["11M06","11M26","11N05","37B99","18D20","52C23"],
    tags:["Hypothèse de Riemann","nombres premiers","structures émergentes","théorie des catégories","quasi-cristaux arithmétiques","principe variationnel","phases logarithmiques","convergence TGSE ∩ ORA"],
    abstract: {
      fr: "Cet article présente une approche nouvelle de l'hypothèse de Riemann, fondée sur l'unification de deux théories développées indépendamment : l'Opérateur de Résonance Arithmétique (ORA) et la Théorie Générale des Structures Émergentes (TGSE). Cette convergence non planifiée suggère une architecture mathématique commune, où les nombres premiers apparaissent comme états fondamentaux d'une structure géométrique sous-jacente.\n\nPlusieurs résultats sont établis. D'abord, la compatibilité entre les caractérisations discrète et continue des premiers, qui convergent vers une même structure quasi-cristalline. Ensuite, la construction explicite d'une mesure sur l'espace des phases logarithmiques qui encode la distribution des premiers et possède un gap spectral uniforme. De cette construction découle un principe variationnel : une certaine fonctionnelle atteint son unique minimum précisément là où l'hypothèse de Riemann prédit les zéros de la fonction zêta.\n\nAu-delà des résultats techniques, une feuille de route détaillée est proposée vers une démonstration complète de l'hypothèse de Riemann : identification des obstacles restants, stratégies concrètes pour les surmonter, connexions avec la théorie ergodique, les systèmes dynamiques et les méthodes computationnelles. Les premiers cas explicites illustrent l'émergence progressive de la structure et la cohérence interne de l'approche. L'arithmétique apparaît alors comme un phénomène émergent : les premiers, configurations minimales stables d'un quasi-cristal dans l'espace des phases, ouvrent des ponts avec la physique des quasi-cristaux, la théorie de l'information et les systèmes complexes.",
      en: "This article presents a new approach to the Riemann hypothesis based on the unification of two independently developed theories: the Arithmetic Resonance Operator (ARO) and the General Theory of Emergent Structures (GTES). This unplanned convergence suggests a common mathematical architecture in which primes appear as the ground states of an underlying geometric structure.\n\nSeveral results are established. First, the compatibility of the discrete and continuous characterisations of primes, which converge to a single quasi-crystalline structure. Next, the explicit construction of a measure on the logarithmic phase space that encodes the distribution of primes and has a uniform spectral gap. From this construction follows a variational principle: a certain functional attains its unique minimum precisely where the Riemann hypothesis predicts the zeros of the zeta function.\n\nBeyond the technical results, a detailed roadmap towards a complete proof of the Riemann hypothesis is proposed: identification of the remaining obstacles, concrete strategies to overcome them, and connections with ergodic theory, dynamical systems, and modern computational methods. Explicit calculations for the first cases illustrate the gradual emergence of the structure and the internal coherence of the approach. Arithmetic then appears as an emergent phenomenon: primes, as stable minimal configurations of a quasi-crystal in phase space, open bridges with the physics of quasi-crystals, information theory, and complex systems."
    } },

  // TGSE I–VI — Arithmétiques graduées (reclassées dans la série TGSE)
  { series:'tgse', track:'v1', title:"Exploration d'une arithmétique graduée — Applications à l'optimisation sur graphes et à la géométrie des systèmes dynamiques", year:2025, month:6, ord:1, doi:"10.5281/zenodo.15661771", type:"preprint", short:"TGSE I", langs:["FR"], rg:"https://www.researchgate.net/publication/394218873", supersededBy:{ doi:"10.5281/zenodo.19423009", short:"Propédeutique I" } },
  { series:'tgse', track:'v1', title:"Proposition d'une arithmétique à graduation hyperréelle — Applications à la régularisation des séries divergentes et à la modélisation quantique phénoménologique", year:2025, month:6, ord:2, doi:"10.5281/zenodo.15676320", type:"preprint", short:"TGSE II", langs:["FR"], rg:"https://www.researchgate.net/publication/394219129", supersededBy:{ doi:"10.5281/zenodo.19517465", short:"Propédeutique II" } },
  { series:'tgse', track:'v1', title:"Arithmétique non standard à graduation hyperréelle — Applications à la stabilité séculaire des systèmes dynamiques et à la renormalisation en théorie quantique des champs", year:2025, month:6, ord:3, doi:"10.5281/zenodo.15684192", type:"preprint", short:"TGSE III", langs:["FR"], rg:"https://www.researchgate.net/publication/394218895" },
  { series:'tgse', track:'v1', title:"Arithmétique non standard hyper-graduée causale — Applications aux réseaux de neurones temporels et aux systèmes quantiques intriqués", year:2025, month:6, ord:4, doi:"10.5281/zenodo.15701599", type:"preprint", short:"TGSE IV", langs:["FR"], rg:"https://www.researchgate.net/publication/394226782" },
  { series:'tgse', track:'v1', title:"Arithmétique complexe non standard hyper-graduée causale — Applications à la théorie spectrale et à la modélisation des circuits électroniques", year:2025, month:6, ord:5, doi:"10.5281/zenodo.15724811", type:"preprint", short:"TGSE V", langs:["FR"], rg:"https://www.researchgate.net/publication/394227004" },
  { series:'tgse', track:'v1', title:"Formalisme des systèmes gradués généralisés — Applications à la synchronisation causale hypercomplexe, aux paradoxes auto-référentiels et aux transitions de phase", year:2025, month:6, ord:6, doi:"10.5281/zenodo.15769504", type:"preprint", short:"TGSE VI", langs:["FR"], rg:"https://www.researchgate.net/publication/394227044" },

  // Pédagogie
  { series:'peda', track:'v1', title:"Herbier de courbes mathématiques — Activités de géométrie dynamique avec GeoGebra Classique 5", year:2026, month:3, ord:1, doi:"10.5281/zenodo.18914259", type:"learning-object", short:"Herbier GeoGebra", rg:"https://www.researchgate.net/publication/401680876" },
  { ord:2, series:'peda', track:'v1', title:"Les fonctions : du collège jusqu'en seconde", year:2012, month:null, type:"book", short:"Livre fonctions",
    url:"https://publimath.fr/ibo12001/",
    pdf:"https://bibnum.publimath.fr/IBO/IBO12001.pdf",
    publisher:"IREM d'Aquitaine, Talence",
    isbn:"978-2-85633-037-1",
    authorNote:"signé Mouton-Mazerand Jean-Philippe",
    collective:"Collectif IREM d'Aquitaine — Groupe Didactique" },

  // Thèse
  { ord:1, series:'these', track:'v1', title:"L'Antinomie de Russell — Étude des paradoxes logiques et ensemblistes", year:1997, month:null, type:"dissertation", short:"Mémoire Russell" },
];

const SERIES = {
  tgse:  { fr:"TGSE — Théorie Générale des Structures Émergentes", en:"TGSE — General Theory of Emergent Structures", order:1 },
  ora:   { fr:"ORA — Opérateur de Résonance Arithmétique", en:"ORA — Arithmetic Resonance Operator", order:2 },
  emv:   { fr:"EMV — Études du Manuscrit de Voynich", en:"EMV — Studies on the Voynich Manuscript", order:3 },
  peda:  { fr:"Pédagogie & ressources", en:"Teaching & resources", order:6 },
  these: { fr:"Travaux antérieurs", en:"Earlier work", order:7 },
};

const SITE = {
  author: {
    name: "Jean-Philippe Mouton",
    roleFR: "Professeur de mathématiques",
    roleEN: "Mathematics teacher",
    affilFR: "Ministère de l'Éducation nationale · Académie de Bordeaux",
    affilEN: "French Ministry of National Education · Bordeaux Academy",
    postFR: "Collège Jean Rostand — Capbreton",
    postEN: "Collège Jean Rostand — Capbreton",
    location: "Capbreton, France",
    email: "contact@lemniscate.pub",
    orcid: "0009-0000-2844-0962",
    links: [
      { label: "ORCID",        href: "https://orcid.org/0009-0000-2844-0962" },
      { label: "Zenodo",       href: "https://zenodo.org/search?q=metadata.creators.person_or_org.name%3A%22Mouton%2C%20Jean-Philippe%22&l=list&p=1&s=25&sort=newest" },
      { label: "ResearchGate", href: "https://www.researchgate.net/profile/Jean-Philippe-Mouton" },
    ],
  },

  bio: {
    fr: [
      "Je suis professeur certifié de mathématiques au collège Jean Rostand, à Capbreton (Landes), et chercheur indépendant. J'enseigne dans le second degré depuis 2010 après un parcours varié d'enseignant contractuel et vacataire en lycée, collège et CFA.",
      "Ma recherche explore plusieurs fronts connexes : une Théorie Générale des Structures Émergentes (TGSE), des arithmétiques non standard à graduation hyperréelle, un Opérateur de Résonance Arithmétique appliqué à l'étude des nombres premiers, et — plus récemment — une analyse statistique systématique du manuscrit de Voynich. Les articles sont déposés en libre accès sur Zenodo.",
      "Ce site rassemble mes publications, mes travaux pédagogiques (Herbier de courbes GeoGebra, livre de fonctions) et mon parcours. Il est conçu comme un cabinet de lecture : stable, lisible, indexé.",
    ],
    en: [
      "I am a certified mathematics professor at Collège Jean Rostand in Capbreton (Landes, France), and an independent researcher. I have been teaching in secondary education since 2010, after a varied career as a contract and temporary teacher in lycées, collèges and vocational training centres.",
      "My research explores several related fronts: a General Theory of Emergent Structures (TGSE), non-standard arithmetics with hyperreal grading, an Arithmetic Resonance Operator applied to the study of prime numbers, and — more recently — a systematic statistical analysis of the Voynich manuscript. All papers are open-access on Zenodo.",
      "This site gathers my publications, my teaching materials (GeoGebra curve herbarium, a book on functions) and my career path. It is designed as a reading cabinet: stable, legible, indexed.",
    ],
  },

  // Fiches de révision interactives — par niveau de classe
  fiches: {
    levels: [
      {
        key: '6e', labelFR: 'Sixième', labelEN: 'Year 7',
        chapters: [
          { num: 1,  title: "Nombres entiers" },
          { num: 2,  title: "Polygones usuels" },
          { num: 3,  title: "Tableaux et graphiques" },
          { num: 4,  title: "Droites et points" },
          { num: 5,  title: "Fractions" },
          { num: 6,  title: "Symétrie axiale" },
          { num: 7,  title: "Nombres décimaux" },
          { num: 8,  title: "Angles" },
          { num: 9,  title: "Addition, soustraction, multiplication" },
          { num: 10, title: "Longueurs, distances et périmètres" },
          { num: 11, title: "Divisions" },
          { num: 12, title: "Aires" },
          { num: 13, title: "Proportionnalité" },
          { num: 14, title: "Espace et temps" },
          { num: 15, title: "Probabilités" },
        ],
      },
      {
        key: '5e', labelFR: 'Cinquième', labelEN: 'Year 8',
        chapters: [
          { num: 1,  title: "Nombres entiers naturels" },
          { num: 2,  title: "Triangles" },
          { num: 3,  title: "Enchaînements d'opérations" },
          { num: 4,  title: "Symétrie centrale" },
          { num: 5,  title: "Expressions littérales" },
          { num: 6,  title: "Angles et triangles" },
          { num: 7,  title: "Fractions", fiche: '/public/fiches/5e-ch07-fractions.html' },
          { num: 8,  title: "Nombres relatifs", fiche: '/public/fiches/5e-ch08-nombres-relatifs.html' },
          { num: 9,  title: "Parallélogrammes" },
          { num: 10, title: "Opérations sur les fractions", fiche: '/public/fiches/5e-ch10-operations-fractions.html' },
          { num: 11, title: "Proportionnalité" },
          { num: 12, title: "Additionner, soustraire des nombres relatifs" },
          { num: 13, title: "Solides et volumes" },
        ],
      },
      {
        key: '4e', labelFR: 'Quatrième', labelEN: 'Year 9',
        chapters: [
          { num: 8, title: "Puissances", fiche: '/public/fiches/4e-ch08-puissances.html' },
          { num: 9, title: "Triangles et droites parallèles", fiche: '/public/fiches/4e-ch09-triangles-droites-paralleles.html' },
          { num: 10, title: "Équations & Inéquations", fiche: '/public/fiches/4e-ch10-equations-inequations.html' },
        ],
        partial: true,  // pas de programmation complète affichée
      },
    ],
  },

  teaching: {
    fr: {
      intro: "J'enseigne les mathématiques au collège Jean Rostand depuis 2011. J'ai également participé au travail de recherche et de rédaction du Groupe Didactique de l'IREM de Bordeaux (Institut de Recherche sur l'Enseignement des Mathématiques, 2010-2012).",
      current: "Collège Jean Rostand, Capbreton — depuis 2011",
      resources: [
        { title: "Herbier de courbes mathématiques", desc: "Activités de géométrie dynamique avec GeoGebra Classique 5.", year: 2026, doi: "10.5281/zenodo.18914259", rg: "https://www.researchgate.net/publication/401680876" },
        { title: "Les fonctions : du collège jusqu'en seconde", desc: "Brochure collective de l'IREM d'Aquitaine — Groupe Didactique. 220 p., A4. Situations d'enseignement expérimentées, du collège à la seconde, sur la notion de fonction. (Publiée sous le nom Mouton-Mazerand Jean-Philippe.)", year: 2012, url: "https://publimath.fr/ibo12001/", pdf: "https://bibnum.publimath.fr/IBO/IBO12001.pdf", isbn: "978-2-85633-037-1" },
      ],
    },
    en: {
      intro: "I have been teaching mathematics at Collège Jean Rostand since 2011. I also contributed to the research and writing of the Didactics Group at IREM Bordeaux (Institute for Research in Mathematics Education, 2010-2012).",
      current: "Collège Jean Rostand, Capbreton — since 2011",
      resources: [
        { title: "Herbarium of mathematical curves", desc: "Dynamic-geometry activities with GeoGebra Classic 5.", year: 2026, doi: "10.5281/zenodo.18914259", rg: "https://www.researchgate.net/publication/401680876" },
        { title: "Functions: from collège to Year 10", desc: "Collective IREM d'Aquitaine brochure — Didactics Group. 220 p., A4. Classroom-tested situations on the notion of function, from collège to seconde. (Published under the name Mouton-Mazerand Jean-Philippe.)", year: 2012, url: "https://publimath.fr/ibo12001/", pdf: "https://bibnum.publimath.fr/IBO/IBO12001.pdf", isbn: "978-2-85633-037-1" },
      ],
    },
  },

  cv: {
    fr: {
      employment: [
        { y: "2011 —", t: "Professeur certifié de mathématiques", sub: "Collège Jean Rostand, Capbreton · Académie de Bordeaux" },
        { y: "2010 — 2011", t: "Professeur stagiaire du CAPES interne", sub: "Collège Alain-Fournier, Bordeaux" },
        { y: "2010 — 2012", t: "Membre du Groupe Didactique — IREM de Bordeaux", sub: "Institut de Recherche sur l'Enseignement des Mathématiques · recherche et rédaction collective" },
        { y: "2006 — 2010", t: "Enseignant contractuel — Mathématiques et Sciences", sub: "CFA du Lycée Gustave Eiffel, Bordeaux" },
        { y: "2005", t: "Enseignant vacataire — Mathématiques", sub: "Lycée François Mauriac, Bordeaux" },
        { y: "2004", t: "Enseignant vacataire — Mathématiques", sub: "Lycée Élie Faure, Lormont" },
        { y: "2003 — 2004", t: "Enseignant contractuel collège & lycée", sub: "École Jacques Prévert (ADEA), Bordeaux" },
        { y: "1997 — 1999", t: "Surveillant d'externat", sub: "Collège Edmond Rostand, Balma · Rectorat de Toulouse" },
        { y: "1995 — 1997", t: "Maître d'internat — Surveillant d'externat", sub: "Lycée Professionnel Galliéni, Toulouse" },
      ],
      qualifications: [
        { y: "2011", t: "CAPES interne de mathématiques", sub: "IUFM d'Aquitaine, Mérignac" },
        { y: "2011", t: "C2i — Certificat informatique et internet", sub: "Université Montesquieu Bordeaux IV" },
        { y: "2010", t: "Astronomie pour les enseignants", sub: "Observatoire de Paris (FOAD)" },
        { y: "1998", t: "Maîtrise de mathématiques", sub: "Université Toulouse III — Paul Sabatier" },
        { y: "1997", t: "Licence de mathématiques fondamentales", sub: "Université Toulouse III — Paul Sabatier" },
        { y: "1997", t: "C1 Expérimenté — Anglais", sub: "Université Toulouse III — Paul Sabatier" },
        { y: "1994", t: "DEUG Sciences mathématiques, informatique et applications aux sciences", sub: "Université Toulouse III — Paul Sabatier" },
      ],
    },
    en: {
      employment: [
        { y: "2011 —", t: "Certified mathematics professor", sub: "Collège Jean Rostand, Capbreton · Bordeaux Academy" },
        { y: "2010 — 2011", t: "Trainee professor (CAPES interne)", sub: "Collège Alain-Fournier, Bordeaux" },
        { y: "2010 — 2012", t: "Member of the Didactics Group — IREM Bordeaux", sub: "Institute for Research in Mathematics Education · collective research and writing" },
        { y: "2006 — 2010", t: "Contract teacher — Mathematics and Science", sub: "Gustave Eiffel vocational centre, Bordeaux" },
        { y: "2005", t: "Temporary teacher — Mathematics", sub: "Lycée François Mauriac, Bordeaux" },
        { y: "2004", t: "Temporary teacher — Mathematics", sub: "Lycée Élie Faure, Lormont" },
        { y: "2003 — 2004", t: "Contract teacher (collège & lycée)", sub: "École Jacques Prévert (ADEA), Bordeaux" },
        { y: "1997 — 1999", t: "School supervisor", sub: "Collège Edmond Rostand, Balma · Toulouse Rectorate" },
        { y: "1995 — 1997", t: "Boarding-school & day-school supervisor", sub: "Lycée Professionnel Galliéni, Toulouse" },
      ],
      qualifications: [
        { y: "2011", t: "CAPES interne — secondary teaching qualification", sub: "IUFM of Aquitaine, Mérignac" },
        { y: "2011", t: "C2i — Computing and Internet Certificate", sub: "Université Montesquieu Bordeaux IV" },
        { y: "2010", t: "Astronomy for teachers", sub: "Paris Observatory (distance learning)" },
        { y: "1998", t: "Master's degree in mathematics", sub: "Université Toulouse III — Paul Sabatier" },
        { y: "1997", t: "Bachelor's degree in fundamental mathematics", sub: "Université Toulouse III — Paul Sabatier" },
        { y: "1997", t: "C1 Advanced — English", sub: "Université Toulouse III — Paul Sabatier" },
        { y: "1994", t: "DEUG — Mathematics, computing and applied sciences", sub: "Université Toulouse III — Paul Sabatier" },
      ],
    },
  },

  papers: PAPERS,
  series: SERIES,
};

window.SITE = SITE;
