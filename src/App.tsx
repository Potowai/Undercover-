/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  Play, 
  UserX, 
  RotateCcw, 
  Info, 
  ChevronRight, 
  CheckCircle2, 
  Skull, 
  Trophy,
  UserCheck,
  Search,
  ChevronLeft,
  X,
  Eye
} from 'lucide-react';

// --- DATA ---
const WORD_PAIRS = [
  { civil: "Chat", undercover: "Tigre" },
  { civil: "Dauphin", undercover: "Requin" },
  { civil: "Poule", undercover: "Dinde" },
  { civil: "Loup", undercover: "Chien" },
  { civil: "Lion", undercover: "Panthère" },
  { civil: "Hibou", undercover: "Chouette" },
  { civil: "Cheval", undercover: "Poney" },
  { civil: "Souris", undercover: "Rat" },
  { civil: "Abeille", undercover: "Guêpe" },
  { civil: "Serpent", undercover: "Lézard" },
  { civil: "Moustique", undercover: "Mouche" },
  { civil: "Vache", undercover: "Taureau" },
  { civil: "Éléphant", undercover: "Mammouth" },
  { civil: "Girafe", undercover: "Zèbre" },
  { civil: "Pingouin", undercover: "Manchot" },
  { civil: "Corbeau", undercover: "Pie" },
  { civil: "Canard", undercover: "Oie" },
  { civil: "Kangourou", undercover: "Wallaby" },
  { civil: "Ours", undercover: "Panda" },
  { civil: "Gorille", undercover: "Chimpanzé" },
  { civil: "Pizza", undercover: "Tarte" },
  { civil: "Burger", undercover: "Sandwich" },
  { civil: "Café", undercover: "Thé" },
  { civil: "Bière", undercover: "Vin" },
  { civil: "Pomme", undercover: "Poire" },
  { civil: "Chocolat", undercover: "Caramel" },
  { civil: "Pâtes", undercover: "Riz" },
  { civil: "Soupe", undercover: "Bouillon" },
  { civil: "Jus", undercover: "Sirop" },
  { civil: "Gâteau", undercover: "Biscuit" },
  { civil: "Lait", undercover: "Crème" },
  { civil: "Fromage", undercover: "Yaourt" },
  { civil: "Pain", undercover: "Baguette" },
  { civil: "Sel", undercover: "Poivre" },
  { civil: "Fraise", undercover: "Framboise" },
  { civil: "Banane", undercover: "Plantain" },
  { civil: "Orange", undercover: "Mandarine" },
  { civil: "Sushi", undercover: "Maki" },
  { civil: "Champagne", undercover: "Cidre" },
  { civil: "Whisky", undercover: "Rhum" },
  { civil: "Football", undercover: "Rugby" },
  { civil: "Tennis", undercover: "Badminton" },
  { civil: "Natation", undercover: "Plongée" },
  { civil: "Ski", undercover: "Snowboard" },
  { civil: "Viseo", undercover: "Cinéma" },
  { civil: "Peinture", undercover: "Dessin" },
  { civil: "Guitare", undercover: "Piano" },
  { civil: "Lecture", undercover: "Écriture" },
  { civil: "Échecs", undercover: "Dames" },
  { civil: "Yoga", undercover: "Pilates" },
  { civil: "Boxe", undercover: "Karaté" },
  { civil: "Cyclisme", undercover: "Motocyclisme" },
  { civil: "Randonnée", undercover: "Escalade" },
  { civil: "Jardinage", undercover: "Bricolage" },
  { civil: "Camping", undercover: "Bivouac" },
  { civil: "Avion", undercover: "Hélicoptère" },
  { civil: "Voiture", undercover: "Camion" },
  { civil: "Bateau", undercover: "Sous-marin" },
  { civil: "Train", undercover: "Métro" },
  { civil: "Vélo", undercover: "Trotinette" },
  { civil: "Fusée", undercover: "Satellite" },
  { civil: "Taxi", undercover: "Uber" },
  { civil: "Moto", undercover: "Scooter" },
  { civil: "Table", undercover: "Bureau" },
  { civil: "Chaise", undercover: "Tabouret" },
  { civil: "Lit", undercover: "Canapé" },
  { civil: "Lampe", undercover: "Lanterne" },
  { civil: "Montre", undercover: "Horloge" },
  { civil: "Stylo", undercover: "Crayon" },
  { civil: "Livre", undercover: "Magazine" },
  { civil: "Clé", undercover: "Serrure" },
  { civil: "Miroir", undercover: "Vitre" },
  { civil: "Sac", undercover: "Valise" },
  { civil: "Téléphone", undercover: "Tablette" },
  { civil: "Ordinateur", undercover: "Clavier" },
  { civil: "Four", undercover: "Micro-ondes" },
  { civil: "Frigo", undercover: "Congélateur" },
  { civil: "Douche", undercover: "Baignoire" },
  { civil: "Soleil", undercover: "Lune" },
  { civil: "Pluie", undercover: "Neige" },
  { civil: "Montagne", undercover: "Colline" },
  { civil: "Océan", undercover: "Mer" },
  { civil: "Forêt", undercover: "Jungle" },
  { civil: "Fleur", undercover: "Plante" },
  { civil: "Arbre", undercover: "Arbuste" },
  { civil: "Orage", undercover: "Tempête" },
  { civil: "Vent", undercover: "Brise" },
  { civil: "Désert", undercover: "Plage" },
  { civil: "Paris", undercover: "Londres" },
  { civil: "Célibataire", undercover: "Marié" },
  { civil: "Riche", undercover: "Célèbre" },
  { civil: "Étudiant", undercover: "Professeur" },
  { civil: "Docteur", undercover: "Infirmier" },
  { civil: "Guerre", undercover: "Combat" },
  { civil: "Paix", undercover: "Silence" },
  { civil: "Amour", undercover: "Amitié" },
  { civil: "Triste", undercover: "Colère" },
  { civil: "Rapide", undercover: "Puissant" },
  { civil: "Halloween", undercover: "Carnaval" },
  { civil: "Noël", undercover: "Pâques" },
  { civil: "Batman", undercover: "Superman" },
  { civil: "Harry Potter", undercover: "Le Seigneur des Anneaux" },
  { civil: "Internet", undercover: "Wifi" },
  { civil: "Docteur", undercover: "Infirmier" },
  { civil: "Pompier", undercover: "Policier" },
  { civil: "Boulanger", undercover: "Pâtissier" },
  { civil: "Plombier", undercover: "Électricien" },
  { civil: "Avocat", undercover: "Juge" },
  { civil: "Architecte", undercover: "Ingénieur" },
  { civil: "Agriculteur", undercover: "Éleveur" },
  { civil: "Boucher", undercover: "Charcutier" },
  { civil: "Coiffeur", undercover: "Esthéticien" },
  { civil: "Facteur", undercover: "Livreur" },
  { civil: "Pilote", undercover: "Capitaine" },
  { civil: "Journaliste", undercover: "Écrivain" },
  { civil: "Acteur", undercover: "Chanteur" },
  { civil: "France", undercover: "Italie" },
  { civil: "Espagne", undercover: "Portugal" },
  { civil: "Japon", undercover: "Chine" },
  { civil: "Canada", undercover: "USA" },
  { civil: "Brésil", undercover: "Argentine" },
  { civil: "Nil", undercover: "Amazonie" },
  { civil: "Everest", undercover: "Mont Blanc" },
  { civil: "Sahara", undercover: "Gobi" },
  { civil: "Atlantique", undercover: "Pacifique" },
  { civil: "Alpes", undercover: "Pyrénées" },
  { civil: "Égypte", undercover: "Grèce" },
  { civil: "Sydney", undercover: "Melbourne" },
  { civil: "New York", undercover: "Los Angeles" },
  { civil: "Cœur", undercover: "Poumon" },
  { civil: "Foie", undercover: "Rein" },
  { civil: "Main", undercover: "Pied" },
  { civil: "Bras", undercover: "Jambe" },
  { civil: "Œil", undercover: "Oreille" },
  { civil: "Nez", undercover: "Bouche" },
  { civil: "Doigt", undercover: "Orteil" },
  { civil: "Dent", undercover: "Gencive" },
  { civil: "Muscle", undercover: "Os" },
  { civil: "Veine", undercover: "Artère" },
  { civil: "Cheveux", undercover: "Poils" },
  { civil: "Peau", undercover: "Chair" },
  { civil: "Joie", undercover: "Bonheur" },
  { civil: "Peur", undercover: "Angoisse" },
  { civil: "Tristesse", undercover: "Mélancolie" },
  { civil: "Colère", undercover: "Rage" },
  { civil: "Surprise", undercover: "Étonnement" },
  { civil: "Dégoût", undercover: "Répulsion" },
  { civil: "Honte", undercover: "Gêne" },
  { civil: "Fierté", undercover: "Arrogance" },
  { civil: "Amour", undercover: "Passion" },
  { civil: "Envie", undercover: "Jalousie" },
  { civil: "Baleine", undercover: "Orque" },
  { civil: "Poulpe", undercover: "Calamar" },
  { civil: "Crevette", undercover: "Gambas" },
  { civil: "Tortue", undercover: "Crabe" },
  { civil: "Méduse", undercover: "Anémone" },
  { civil: "Hippocampe", undercover: "Poisson-clown" },
  { civil: "Raie", undercover: "Anguille" },
  { civil: "Étoile de mer", undercover: "Oursin" },
  { civil: "Phoque", undercover: "Otarie" },
  { civil: "Corail", undercover: "Éponge" },
  { civil: "Brosse à dents", undercover: "Peigne" },
  { civil: "Savon", undercover: "Shampoing" },
  { civil: "Serviette", undercover: "Gant de toilette" },
  { civil: "Lunettes", undercover: "Lentilles" },
  { civil: "Clés", undercover: "Badge" },
  { civil: "Portefeuille", undercover: "Porte-monnaie" },
  { civil: "Parapluie", undercover: "Imperméable" },
  { civil: "Allumettes", undercover: "Briquet" },
  { civil: "Ciseaux", undercover: "Cutter" },
  { civil: "Épingles", undercover: "Aiguilles" },
  { civil: "Canif", undercover: "Poignard" },
  { civil: "Cadenas", undercover: "Verrou" },
  { civil: "Écran", undercover: "Moniteur" },
  { civil: "Souris", undercover: "Pavé tactile" },
  { civil: "Clavier", undercover: "Touches" },
  { civil: "Casque", undercover: "Écouteurs" },
  { civil: "Batterie", undercover: "Accu" },
  { civil: "Prise", undercover: "Rallonge" },
  { civil: "Câble", undercover: "Fils" },
  { civil: "Logiciel", undercover: "Application" },
  { civil: "Virus", undercover: "Bogue" },
  { civil: "Site", undercover: "Lien" },
  { civil: "T-shirt", undercover: "Débardeur" },
  { civil: "Jean", undercover: "Pantalon" },
  { civil: "Robe", undercover: "Jupe" },
  { civil: "Veste", undercover: "Manteau" },
  { civil: "Pull", undercover: "Gilet" },
  { civil: "Chaussette", undercover: "Bas" },
  { civil: "Chaussure", undercover: "Botte" },
  { civil: "Chapeau", undercover: "Bonnet" },
  { civil: "Casquette", undercover: "Béret" },
  { civil: "Ceinture", undercover: "Bretelle" },
  { civil: "Guitare", undercover: "Basse" },
  { civil: "Violon", undercover: "Alto" },
  { civil: "Flûte", undercover: "Clarinette" },
  { civil: "Trompette", undercover: "Trombone" },
  { civil: "Batterie", undercover: "Percussions" },
  { civil: "Saxophone", undercover: "Cornet" },
  { civil: "Note", undercover: "Accord" },
  { civil: "Rythme", undercover: "Tempo" },
  { civil: "Concert", undercover: "Festival" },
  { civil: "Album", undercover: "Disque" },
  { civil: "Carotte", undercover: "Panais" },
  { civil: "Courge", undercover: "Potiron" },
  { civil: "Épinard", undercover: "Laitue" },
  { civil: "Oignon", undercover: "Échalote" },
  { civil: "Ail", undercover: "Oignon" },
  { civil: "Tomate", undercover: "Aubergine" },
  { civil: "Poivron", undercover: "Piment" },
  { civil: "Raisin", undercover: "Cassis" },
  { civil: "Noix", undercover: "Noisette" },
  { civil: "Amande", undercover: "Pistache" },
  { civil: "Dragon", undercover: "Griffon" },
  { civil: "Elfe", undercover: "Nain" },
  { civil: "Orc", undercover: "Troll" },
  { civil: "Magicien", undercover: "Sorcier" },
  { civil: "Chevalier", undercover: "Écuyer" },
  { civil: "Château", undercover: "Forteresse" },
  { civil: "Épée", undercover: "Sabre" },
  { civil: "Arc", undercover: "Arbalète" },
  { civil: "Bouclier", undercover: "Armure" },
  { civil: "Donjon", undercover: "Prison" },
  { civil: "Curiosité", undercover: "Intérêt" },
  { civil: "Ennui", undercover: "Lassitude" },
  { civil: "Fatigue", undercover: "Somnolence" },
  { civil: "Faim", undercover: "Appétit" },
  { civil: "Soif", undercover: "Déshydratation" },
  { civil: "Douleur", undercover: "Souffrance" },
  { civil: "Plaisir", undercover: "Jouissance" },
  { civil: "Calme", undercover: "Sérénité" },
  { civil: "Stress", undercover: "Tension" },
  { civil: "Confiance", undercover: "Foi" },
];

// --- TYPES ---
type Role = 'civil' | 'undercover' | 'mrwhite';
type Phase = 'accueil' | 'config' | 'distribution' | 'confirm_start' | 'jeu' | 'reveal_elimination' | 'mrwhite_guess' | 'fin';

interface Player {
  id: number;
  name: string;
  role: Role;
  word: string;
  isEliminated: boolean;
}

interface GameConfig {
  playerCount: number;
  undercoverCount: number;
  hasMrWhite: boolean;
}

// --- UTILS ---
const shuffle = <T,>(array: T[]): T[] => {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};

// --- COMPONENTS ---

export default function App() {
  const [phase, setPhase] = useState<Phase>('accueil');
  const [gameConfig, setGameConfig] = useState<GameConfig>({
    playerCount: 4,
    undercoverCount: 1,
    hasMrWhite: false,
  });
  const [players, setPlayers] = useState<Player[]>([]);
  const [playerNames, setPlayerNames] = useState<string[]>([]);
  const [distributionIndex, setDistributionIndex] = useState(0);
  const [isRevealPhase, setIsRevealPhase] = useState(false);
  const [showPassScreen, setShowPassScreen] = useState(true);
  const [currentWordPair, setCurrentWordPair] = useState<{ civil: string; undercover: string } | null>(null);
  const [showRules, setShowRules] = useState(false);
  const [gameWinner, setGameWinner] = useState<'civils' | 'undercovers' | 'mrwhite' | null>(null);
  const [eliminatedPlayer, setEliminatedPlayer] = useState<Player | null>(null);

  useEffect(() => {
    setPlayerNames(prev => {
      const newNames = [...prev];
      for (let i = 0; i < gameConfig.playerCount; i++) {
        if (!newNames[i]) newNames[i] = `Joueur ${i + 1}`;
      }
      return newNames.slice(0, gameConfig.playerCount);
    });

    setGameConfig(prev => ({
      ...prev,
      undercoverCount: Math.min(prev.undercoverCount, Math.floor(gameConfig.playerCount / 3)),
    }));
  }, [gameConfig.playerCount]);

  const startGame = useCallback(() => {
    const pair = WORD_PAIRS[Math.floor(Math.random() * WORD_PAIRS.length)];
    setCurrentWordPair(pair);

    const roles: Role[] = [];
    for (let i = 0; i < gameConfig.undercoverCount; i++) roles.push('undercover');
    if (gameConfig.hasMrWhite) roles.push('mrwhite');
    while (roles.length < gameConfig.playerCount) roles.push('civil');

    const shuffledRoles = shuffle(roles);
    const newPlayers: Player[] = shuffledRoles.map((role, i) => ({
      id: i,
      name: playerNames[i] || `Joueur ${i + 1}`,
      role,
      word: role === 'civil' ? pair.civil : role === 'undercover' ? pair.undercover : "???",
      isEliminated: false,
    }));

    setPlayers(newPlayers);
    setDistributionIndex(0);
    setIsRevealPhase(false);
    setShowPassScreen(true);
    setPhase('distribution');
    setGameWinner(null);
  }, [gameConfig, playerNames]);

  const checkWinCondition = (currentPlayers: Player[]) => {
    const alivePlayers = currentPlayers.filter(p => !p.isEliminated);
    const aliveUndercovers = alivePlayers.filter(p => p.role === 'undercover' || p.role === 'mrwhite').length;
    const aliveCivils = alivePlayers.filter(p => p.role === 'civil').length;

    if (aliveUndercovers === 0) {
      setGameWinner('civils');
      setPhase('fin');
      return true;
    }
    
    if (aliveUndercovers >= aliveCivils) {
      const mrWhiteAlive = alivePlayers.some(p => p.role === 'mrwhite');
      setGameWinner(mrWhiteAlive ? 'mrwhite' : 'undercovers');
      setPhase('fin');
      return true;
    }

    return false;
  };

  const eliminatePlayer = (playerId: number) => {
    const playerToEliminate = players.find(p => p.id === playerId);
    if (!playerToEliminate) return;

    const updatedPlayers = players.map(p => 
      p.id === playerId ? { ...p, isEliminated: true } : p
    );
    setPlayers(updatedPlayers);
    setEliminatedPlayer({ ...playerToEliminate, isEliminated: true });
    setPhase('reveal_elimination');
  };

  const handleAfterReveal = () => {
    if (!eliminatedPlayer) return;

    if (eliminatedPlayer.role === 'mrwhite') {
      setPhase('mrwhite_guess');
    } else {
      if (!checkWinCondition(players)) {
        setPhase('jeu');
      }
    }
    setEliminatedPlayer(null);
  };

  const verifyMrWhiteGuess = (success: boolean) => {
    if (success) {
      setGameWinner('mrwhite');
      setPhase('fin');
    } else {
      if (!checkWinCondition(players)) {
        setPhase('jeu');
      }
    }
  };

  const renderHome = () => (
    <div className="flex flex-col items-center justify-center p-12 space-y-16 h-full text-center">
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="space-y-6">
        <h1 className="text-6xl font-serif font-bold text-claude-text tracking-tight">Undercover</h1>
        <p className="text-claude-secondary font-medium tracking-wide max-w-xs mx-auto text-lg leading-relaxed">
          Un jeu de déduction sociale élégant pour vos soirées.
        </p>
      </motion.div>
      <div className="flex flex-col w-full max-w-xs space-y-6">
        <button onClick={() => setPhase('config')} className="flex items-center justify-center space-x-3 bg-claude-text hover:bg-stone-800 text-claude-bg font-semibold py-5 rounded-2xl transition-all shadow-sm">
          <Play className="w-5 h-5 fill-current" />
          <span className="text-lg">Démarrer une partie</span>
        </button>
        <button onClick={() => setShowRules(true)} className="flex items-center justify-center space-x-3 bg-white hover:bg-stone-50 text-claude-text font-semibold py-4 rounded-2xl border border-claude-border transition-all shadow-sm">
          <Info className="w-5 h-5" />
          <span className="text-sm">Règles du jeu</span>
        </button>
      </div>
      <AnimatePresence>
        {showRules && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-stone-900/40 backdrop-blur-sm" onClick={() => setShowRules(false)}>
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} onClick={(e) => e.stopPropagation()} className="bg-claude-bg border border-claude-border rounded-[2rem] p-8 max-w-sm w-full relative overflow-y-auto max-h-[80vh] shadow-2xl">
              <button onClick={() => setShowRules(false)} className="absolute top-6 right-6 text-stone-400 hover:text-claude-text"><X className="w-6 h-6" /></button>
              <h2 className="text-3xl font-serif font-bold text-claude-text mb-8">Comment jouer</h2>
              <div className="space-y-8 text-claude-text text-left text-sm leading-relaxed">
                <div className="space-y-3">
                  <h3 className="text-claude-accent font-bold uppercase tracking-widest text-xs flex items-center gap-2"><Users className="w-4 h-4" /> Les Rôles</h3>
                  <div className="space-y-4 font-medium">
                    <p><span className="text-claude-text font-bold">Civils :</span> Même mot (ex: Forêt).</p>
                    <p><span className="text-claude-text font-bold">Undercovers :</span> Mot différent (ex: Jungle).</p>
                    <p><span className="text-claude-text font-bold">Mr. White :</span> Aucun mot. Bluffez !</p>
                  </div>
                </div>
                <div className="space-y-3"><h3 className="text-claude-accent font-bold uppercase tracking-widest text-xs flex items-center gap-2"><Search className="w-4 h-4" /> Déroulement</h3><p className="font-medium">Un indice oral à tour de rôle. Débattez et votez !</p></div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  const renderConfig = () => (
    <div className="flex flex-col p-8 space-y-10 h-full overflow-hidden">
      <div className="flex items-center space-x-4">
        <button onClick={() => setPhase('accueil')} className="p-2 text-stone-400 hover:text-claude-text transition-colors"><ChevronLeft className="w-8 h-8" /></button>
        <h2 className="text-3xl font-serif font-bold text-claude-text">Configuration</h2>
      </div>
      <div className="flex-1 space-y-10 overflow-y-auto pr-2 custom-scrollbar">
        <div className="space-y-6">
          <div className="flex justify-between items-end px-2"><h3 className="text-xs font-bold uppercase tracking-[0.2em] text-claude-secondary">Joueurs</h3><span className="text-4xl font-serif font-bold text-claude-text">{gameConfig.playerCount}</span></div>
          <div className="relative h-2 bg-stone-200 rounded-full flex items-center">
            <input type="range" min="3" max="12" step="1" value={gameConfig.playerCount} onChange={(e) => setGameConfig(prev => ({ ...prev, playerCount: parseInt(e.target.value) }))} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
            <div className="h-full bg-claude-text rounded-full relative" style={{ width: `${((gameConfig.playerCount - 3) / 9) * 100}%` }}><div className="absolute right-0 top-1/2 -translate-y-1/2 w-6 h-6 bg-white border-2 border-claude-text rounded-full shadow-md" /></div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white border border-claude-border p-6 rounded-[1.5rem] space-y-4 shadow-sm">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-claude-secondary text-center">Undercovers</h3>
            <div className="flex items-center justify-between">
              <button onClick={() => setGameConfig(prev => ({ ...prev, undercoverCount: Math.max(1, prev.undercoverCount - 1) }))} className="w-10 h-10 rounded-full bg-stone-50 border border-stone-200 flex items-center justify-center text-claude-text hover:bg-stone-100 transition-colors">-</button>
              <span className="text-2xl font-serif font-bold text-claude-text">{gameConfig.undercoverCount}</span>
              <button onClick={() => setGameConfig(prev => ({ ...prev, undercoverCount: Math.min(Math.floor(gameConfig.playerCount / 3), prev.undercoverCount + 1) }))} className="w-10 h-10 rounded-full bg-stone-50 border border-stone-200 flex items-center justify-center text-claude-text hover:bg-stone-100 transition-colors">+</button>
            </div>
          </div>
          <button onClick={() => setGameConfig(prev => ({ ...prev, hasMrWhite: !prev.hasMrWhite }))} className={`p-6 rounded-[1.5rem] border transition-all flex flex-col justify-between text-left shadow-sm ${gameConfig.hasMrWhite ? 'bg-stone-100 border-claude-text' : 'bg-white border-claude-border'}`}>
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-claude-secondary">Mr. White</h3>
            <div className="flex items-center justify-between mt-auto">
              <span className={`text-xl font-serif font-bold ${gameConfig.hasMrWhite ? 'text-claude-text' : 'text-stone-300'}`}>{gameConfig.hasMrWhite ? 'Actif' : 'Inactif'}</span>
              <div className={`w-3 h-3 rounded-full ${gameConfig.hasMrWhite ? 'bg-claude-accent' : 'bg-stone-200'}`} />
            </div>
          </button>
        </div>
        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-claude-secondary px-2">Identités</h3>
          <div className="space-y-3">
            {playerNames.map((name, i) => (
              <div key={i} className="flex items-center bg-white border border-claude-border rounded-2xl px-5 py-4 focus-within:ring-2 focus-within:ring-claude-text/5 focus-within:border-claude-text shadow-sm">
                <span className="text-stone-400 font-serif font-bold text-sm w-10">0{i+1}</span>
                <input type="text" value={name} placeholder={`Joueur ${i+1}`} onChange={(e) => { const newNames = [...playerNames]; newNames[i] = e.target.value; setPlayerNames(newNames); }} className="bg-transparent text-claude-text w-full focus:outline-none font-semibold text-lg" />
              </div>
            ))}
          </div>
        </div>
      </div>
      <button onClick={startGame} className="w-full bg-claude-text hover:bg-stone-800 text-claude-bg font-bold py-5 rounded-2xl shadow-lg transition-all active:scale-98 uppercase tracking-widest text-sm">Lancer</button>
    </div>
  );

  const renderDistribution = () => {
    const currentPlayer = players[distributionIndex];
    if (!currentPlayer) return null;
    if (showPassScreen) {
      return (
        <div className="flex flex-col items-center justify-center p-12 space-y-12 h-full text-center">
          <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="space-y-8">
            <span className="text-claude-accent font-bold uppercase tracking-[0.3em] text-[10px]">Distribution</span>
            <h2 className="text-4xl font-serif font-bold text-claude-text leading-tight">Passez à <br/><span className="text-claude-accent italic">"{currentPlayer.name}"</span></h2>
          </motion.div>
          <button onClick={() => setShowPassScreen(false)} className="bg-claude-text text-claude-bg font-bold px-12 py-5 rounded-full hover:bg-stone-800 transition-all shadow-xl">Je suis {currentPlayer.name}</button>
        </div>
      );
    }
    return (
      <div className="flex flex-col items-center justify-center p-12 h-full bg-claude-bg">
        {!isRevealPhase ? (
          <div className="text-center space-y-12 w-full">
            <h2 className="text-4xl font-serif font-bold text-claude-text italic">{currentPlayer.name}</h2>
            <LongPressButton onLongPress={() => setIsRevealPhase(true)} label="Révéler mon identité" />
            <p className="text-stone-400 text-xs font-medium italic animate-pulse">Maintenez pour voir votre rôle</p>
          </div>
        ) : (
          <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="w-full text-center space-y-12">
            <div className="p-12 rounded-[3.5rem] bg-white border border-stone-200 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-claude-accent" />
                <span className="text-claude-secondary text-[10px] font-bold uppercase tracking-[0.4em] mb-10 block">Mot Secret</span>
                <h1 className={`font-serif font-bold text-claude-text tracking-tighter mb-4 break-words leading-tight ${
                  (currentPlayer.role === 'mrwhite' ? 'MR. WHITE' : currentPlayer.word).length > 15 ? 'text-3xl' :
                  (currentPlayer.role === 'mrwhite' ? 'MR. WHITE' : currentPlayer.word).length > 10 ? 'text-4xl' : 'text-5xl'
                }`}>
                  {currentPlayer.role === 'mrwhite' ? 'MR. WHITE' : currentPlayer.word}
                </h1>
                {currentPlayer.role === 'mrwhite' && <p className="text-claude-accent text-sm font-bold italic mt-6">"Bluffez pour gagner."</p>}
            </div>
            <button onClick={() => { if (distributionIndex < players.length - 1) { setDistributionIndex(prev => prev + 1); setShowPassScreen(true); setIsRevealPhase(false); } else { setPhase('confirm_start'); } }} className="w-full bg-claude-text text-claude-bg font-bold py-5 rounded-3xl hover:bg-stone-800 transition-colors uppercase tracking-widest text-xs shadow-md">Compris</button>
          </motion.div>
        )}
      </div>
    );
  };

  const renderGame = () => (
    <div className="flex flex-col p-8 space-y-8 h-full">
      <div className="flex justify-between items-center bg-white p-6 rounded-[2rem] border border-stone-200 shadow-sm">
        <h2 className="text-2xl font-serif font-bold text-claude-text">L'Enquête</h2>
        <div className="flex items-center bg-stone-50 border border-stone-100 px-4 py-2 rounded-2xl">
          <span className="text-xs font-bold text-claude-text pr-2 border-r border-stone-200 mr-2">{players.filter(p => !p.isEliminated).length} / {players.length}</span>
          <Users className="w-4 h-4 text-claude-secondary" />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-4">
        {players.map((p) => (
          <motion.button 
            key={p.id} 
            disabled={p.isEliminated} 
            onClick={() => eliminatePlayer(p.id)} 
            className={`w-full flex items-center justify-between p-6 rounded-[2rem] transition-all border shadow-sm ${
              p.isEliminated 
              ? 'bg-stone-50 border-stone-100 opacity-80' 
              : 'bg-white border-claude-border hover:border-claude-accent group'
            }`}
          >
            <div className="flex items-center space-x-5">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${p.isEliminated ? 'bg-stone-200' : 'bg-stone-50'}`}>
                {p.isEliminated ? <Skull className="w-6 h-6 text-stone-400" /> : <UserCheck className="w-6 h-6 text-claude-text" />}
              </div>
              <div className="text-left">
                <span className={`text-xl font-serif font-bold block ${p.isEliminated ? 'text-stone-400' : 'text-claude-text'}`}>
                  {p.name}
                </span>
                {p.isEliminated && (
                  <span className="text-[10px] font-bold text-claude-accent uppercase tracking-[0.1em]">
                    {p.role === 'civil' ? 'Civil' : p.role === 'undercover' ? 'Undercover' : 'Mr. White'}
                  </span>
                )}
              </div>
            </div>
            {!p.isEliminated && <UserX className="w-5 h-5 text-stone-300 group-hover:text-claude-accent transition-colors" />}
          </motion.button>
        ))}
      </div>
      <button onClick={() => setPhase('fin')} className="text-stone-400 hover:text-claude-accent flex items-center justify-center space-x-2 py-2 group"><Eye className="w-4 h-4 group-hover:scale-110" /><span className="text-[10px] uppercase font-bold tracking-widest">Voir les rôles</span></button>
    </div>
  );

  const renderRevealElimination = () => {
    if (!eliminatedPlayer) return null;
    
    return (
      <div className="flex flex-col items-center justify-center p-12 space-y-12 h-full text-center bg-claude-bg">
        <motion.div
           initial={{ scale: 0.9, opacity: 0 }}
           animate={{ scale: 1, opacity: 1 }}
           className="space-y-8 w-full"
        >
          <div className="space-y-2">
            <span className="text-claude-secondary text-[10px] font-bold uppercase tracking-[0.3em]">Verdict du vote</span>
            <h2 className="text-5xl font-serif font-bold text-claude-text italic">{eliminatedPlayer.name}</h2>
          </div>

          <div className="p-12 rounded-[4rem] bg-white border border-stone-200 shadow-2xl relative overflow-hidden mx-auto max-w-sm">
            <div className={`absolute top-0 left-0 w-full h-2 ${eliminatedPlayer.role === 'civil' ? 'bg-stone-300' : 'bg-claude-accent'}`} />
            
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-stone-400 mb-6 block">Était en réalité</span>
            
            <h3 className={`text-4xl font-serif font-bold mb-4 tracking-tight uppercase ${eliminatedPlayer.role === 'civil' ? 'text-stone-400' : 'text-claude-accent'}`}>
              {eliminatedPlayer.role === 'civil' ? 'Un Civil' : eliminatedPlayer.role === 'undercover' ? 'Un Undercover' : 'Mr. White'}
            </h3>

            {(eliminatedPlayer.role !== 'mrwhite') && (
              <div className="mt-8 pt-8 border-t border-stone-100">
                <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400 block mb-2">Son mot secret</span>
                <p className="text-2xl font-serif font-bold text-claude-text">{eliminatedPlayer.word}</p>
              </div>
            )}
          </div>

          <p className="text-stone-400 font-medium italic">
            {eliminatedPlayer.role === 'civil' ? "Le groupe s'est trompé..." : "Bien joué ! Un infiltré en moins."}
          </p>

          <button
            onClick={handleAfterReveal}
            className="w-full max-w-xs bg-claude-text text-claude-bg font-bold py-6 rounded-full shadow-lg active:scale-95 transition-all text-sm uppercase tracking-widest"
          >
            Continuer la partie
          </button>
        </motion.div>
      </div>
    );
  };

  const renderMrWhiteGuess = () => (
    <div className="flex flex-col items-center justify-center p-12 space-y-12 h-full text-center bg-claude-bg">
      <div className="space-y-8">
        <div className="bg-claude-accent/10 w-24 h-24 rounded-full flex items-center justify-center mx-auto shadow-inner"><Search className="w-12 h-12 text-claude-accent" /></div>
        <div className="space-y-4 text-claude-text">
          <h2 className="text-4xl font-serif font-bold italic">Mr. White démasqué.</h2>
          <p className="font-medium text-lg">Devinez le mot civil <span className="font-bold underline decoration-claude-accent">à voix haute.</span></p>
        </div>
      </div>
      <div className="w-full max-w-sm grid grid-cols-1 gap-4 pt-10">
        <button onClick={() => verifyMrWhiteGuess(true)} className="bg-claude-text text-claude-bg font-bold py-6 rounded-3xl uppercase tracking-widest shadow-xl active:scale-95 text-sm">Gagné</button>
        <button onClick={() => verifyMrWhiteGuess(false)} className="bg-white border border-stone-200 text-claude-text font-bold py-6 rounded-3xl uppercase tracking-widest hover:bg-stone-50 active:scale-95 text-sm">Perdu</button>
      </div>
      <div className="bg-stone-100 p-6 rounded-[2rem] border border-stone-200 mt-8 w-full max-w-xs">
        <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">Mot secret civil</p>
        <p className={`font-serif font-bold text-claude-text opacity-50 blur-[4px] hover:blur-none transition-all cursor-help break-words ${
          (currentWordPair?.civil || "").length > 15 ? 'text-lg' : 'text-xl'
        }`}>
          {currentWordPair?.civil}
        </p>
      </div>
    </div>
  );

  const renderFin = () => (
    <div className="flex flex-col p-8 space-y-12 h-full overflow-hidden">
      <div className="text-center space-y-6 pt-12">
        <div className={`w-32 h-32 rounded-full flex items-center justify-center mx-auto border-2 shadow-2xl relative ${gameWinner === 'civils' ? 'bg-white border-claude-accent' : 'bg-claude-text border-stone-700'}`}>
          <div className="absolute -top-4 -right-4 bg-claude-accent p-2 rounded-full shadow-lg"><Trophy className="w-6 h-6 text-white" /></div>
          {gameWinner === 'civils' ? <Users className="w-16 h-16 text-claude-text" /> : <Skull className="w-16 h-16 text-claude-accent" />}
        </div>
        <h1 className="text-4xl font-serif font-bold text-claude-text tracking-tighter uppercase">{gameWinner === 'civils' ? 'Civils triomphent' : 'Infiltration réussie'}</h1>
      </div>
      <div className="flex-1 overflow-y-auto space-y-4 custom-scrollbar pr-2">
        {players.map((p) => (
          <div key={p.id} className={`flex items-center justify-between p-7 rounded-[2.5rem] border shadow-sm ${p.role === 'civil' ? 'bg-white border-stone-200' : 'bg-stone-50 border-claude-accent/30'}`}>
            <div className="space-y-1">
              <span className="text-xl font-serif font-bold block">{p.name} {p.isEliminated && '💀'}</span>
              <p className={`text-[10px] font-bold uppercase tracking-widest ${p.role === 'civil' ? 'text-stone-400' : 'text-claude-accent'}`}>{p.role}</p>
            </div>
            <div className="text-right ml-4">
              <p className="font-serif font-bold text-lg break-words leading-tight">{p.role === 'mrwhite' ? '---' : p.word}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col space-y-4 pb-4">
        <button onClick={startGame} className="w-full bg-claude-text text-claude-bg font-bold py-6 rounded-3xl flex items-center justify-center space-x-4 hover:bg-stone-800 transition-all shadow-xl"><RotateCcw className="w-5 h-5" /><span className="uppercase tracking-widest text-sm">Rejouer</span></button>
        <button onClick={() => setPhase('accueil')} className="text-stone-400 hover:text-claude-accent uppercase tracking-[0.2em] text-[10px] py-2">Retour au menu</button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-claude-bg text-claude-text font-sans select-none flex justify-center overflow-x-hidden">
      <div className="w-full max-w-md flex flex-col relative min-h-screen shadow-sm">
        <AnimatePresence mode="wait">
          <motion.div 
            key={phase} 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            transition={{ duration: 0.3 }} 
            className="flex-1 flex flex-col"
          >
            <div className="flex-1 h-full w-full overflow-y-auto px-1 py-4 custom-scrollbar">
              {phase === 'accueil' && renderHome()}
              {phase === 'config' && renderConfig()}
              {phase === 'distribution' && renderDistribution()}
              {phase === 'jeu' && renderGame()}
              {phase === 'confirm_start' && (
                 <div className="flex flex-col items-center justify-center p-12 space-y-12 min-h-[80vh] text-center">
                    <div className="space-y-8">
                      <CheckCircle2 className="w-16 h-16 text-claude-accent mx-auto" />
                      <h2 className="text-4xl font-serif font-bold italic leading-tight">Agents informés.</h2>
                      <p className="text-claude-secondary font-medium">L'enquête peut commencer.</p>
                    </div>
                    <button onClick={() => setPhase('jeu')} className="bg-claude-text text-claude-bg font-bold px-16 py-6 rounded-full uppercase tracking-widest shadow-lg active:scale-95 transition-all">Débuter</button>
                 </div>
              )}
              {phase === 'reveal_elimination' && renderRevealElimination()}
            {phase === 'mrwhite_guess' && renderMrWhiteGuess()}
              {phase === 'fin' && renderFin()}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 3px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e8e6e1; border-radius: 10px; }
        
        body { 
          background-color: #f9f7f2;
          -webkit-font-smoothing: antialiased; 
          overscroll-behavior-y: none;
        }

        /* Prevent unwanted gaps on mobile */
        html, body, #root {
          height: 100%;
          margin: 0;
          padding: 0;
        }
      `}</style>
    </div>
  );
}

function LongPressButton({ onLongPress, label }: { onLongPress: () => void, label: string }) {
  const [isPressing, setIsPressing] = useState(false);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<number | null>(null);
  const progressIntervalRef = useRef<number | null>(null);

  const startPress = () => {
    setIsPressing(true);
    setProgress(0);
    const startTime = Date.now();
    progressIntervalRef.current = window.setInterval(() => {
      const elapsed = Date.now() - startTime;
      setProgress(Math.min(100, (elapsed / 1000) * 100));
    }, 10);
    timerRef.current = window.setTimeout(() => { onLongPress(); stopPress(); }, 1000);
  };

  const stopPress = () => {
    setIsPressing(false);
    setProgress(0);
    if (timerRef.current) clearTimeout(timerRef.current);
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
  };

  return (
    <button onPointerDown={startPress} onPointerUp={stopPress} onPointerLeave={stopPress} className={`relative w-full p-8 rounded-[2rem] overflow-hidden transition-all duration-300 ${isPressing ? 'scale-[0.97]' : 'hover:bg-white border border-stone-200 bg-stone-50'}`}>
      <div className="absolute bottom-0 left-0 h-1 bg-claude-accent transition-all ease-linear" style={{ width: `${progress}%` }} />
      <div className="flex items-center justify-center space-x-4">
        <div className={`w-3 h-3 rounded-full transition-all duration-300 ${isPressing ? 'bg-claude-accent scale-150' : 'bg-stone-300'}`} />
        <span className={`text-xl font-serif font-bold tracking-tight ${isPressing ? 'text-claude-text' : 'text-stone-400'}`}>{label}</span>
      </div>
    </button>
  );
}
