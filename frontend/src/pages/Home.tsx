import React, { Suspense, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Text3D, Float, Environment } from '@react-three/drei';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  ArrowRightIcon, 
  ChartBarIcon, 
  CubeIcon, 
  ShieldCheckIcon,
  TruckIcon,
  BuildingOfficeIcon,
  ChartPieIcon,
  ArrowTrendingUpIcon
} from '@heroicons/react/24/outline';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Mesh, BufferGeometry, Material, Object3DEventMap } from 'three';

ChartJS.register(ArcElement, Tooltip, Legend);

// Types
interface AnimatedStatProps {
  value: string;
  label: string;
  delay: number;
}

interface FeatureCardProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
  delay: number;
  color: string;
}

// 3D Models
function Truck() {
  const truckRef = useRef<Mesh<BufferGeometry, Material | Material[], Object3DEventMap>>(null);
  
  useFrame((state) => {
    if (truckRef.current) {
      truckRef.current.position.x = Math.sin(state.clock.elapsedTime) * 2;
    }
  });
  
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={truckRef} position={[0, 0, 0]}>
        <boxGeometry args={[1, 0.5, 0.5]} />
        <meshStandardMaterial color="#3b82f6" />
      </mesh>
    </Float>
  );
}

function Warehouse() {
  return (
    <group position={[0, -1, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[3, 2, 2]} />
        <meshStandardMaterial color="#4b5563" />
      </mesh>
    </group>
  );
}

// Animated Stats Component
const AnimatedStat: React.FC<AnimatedStatProps> = ({ value, label, delay }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [50, 0, -50]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y }}
      transition={{ duration: 0.5, delay }}
      className="text-center"
    >
      <div className="text-6xl font-bold text-primary-500 mb-2">{value}</div>
      <div className="text-gray-300 text-lg">{label}</div>
    </motion.div>
  );
};

// Enhanced Feature Card
const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description, delay, color }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    viewport={{ once: true }}
    className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:scale-105 transition-transform"
  >
    <div className="flex items-center space-x-4">
      <div className={`p-3 rounded-lg ${color}`}>
        <Icon className="h-6 w-6 text-white" />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <p className="text-gray-300 mt-1">{description}</p>
      </div>
    </div>
  </motion.div>
);

// Chart Component
const InventoryChart = () => {
  const data = {
    labels: ['In Stock', 'Low Stock', 'Out of Stock'],
    datasets: [
      {
        data: [60, 25, 15],
        backgroundColor: ['#10B981', '#F59E0B', '#EF4444'],
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
      <Doughnut 
        data={data} 
        options={{
          cutout: '70%',
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                color: '#fff',
                font: {
                  size: 14
                }
              }
            }
          }
        }}
      />
    </div>
  );
};

// 3D Scene Component
function Scene() {
  return (
    <>
      <Environment preset="city" />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Warehouse />
      <Truck />
      <Text3D
        font="/fonts/helvetiker_regular.typeface.json"
        size={0.5}
        height={0.1}
        position={[-2, 1, 0]}
      >
        Smart Inventory
        <meshStandardMaterial color="#3b82f6" />
      </Text3D>
      <OrbitControls enableZoom={false} />
    </>
  );
}

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Canvas>
            <Suspense fallback={null}>
              <Scene />
            </Suspense>
          </Canvas>
        </div>
        
        <div className="relative z-10 text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-primary-600"
          >
            Smart Inventory Management
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto"
          >
            Revolutionize your inventory management with AI-powered insights and real-time tracking
          </motion.p>
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-8 py-4 rounded-full bg-primary-500 text-white font-semibold text-lg shadow-lg hover:bg-primary-600 transition-colors"
          >
            Get Started
            <ArrowRightIcon className="ml-2 h-5 w-5" />
          </motion.button>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-16"
          >
            Powerful Features
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={TruckIcon}
              title="Real-time Tracking"
              description="Track inventory movement in real-time"
              delay={0.2}
              color="bg-blue-500"
            />
            <FeatureCard
              icon={BuildingOfficeIcon}
              title="Warehouse Management"
              description="Optimize your warehouse operations"
              delay={0.4}
              color="bg-green-500"
            />
            <FeatureCard
              icon={ChartPieIcon}
              title="Analytics Dashboard"
              description="Get detailed insights and reports"
              delay={0.6}
              color="bg-purple-500"
            />
            <FeatureCard
              icon={ArrowTrendingUpIcon}
              title="Growth Insights"
              description="Predict and plan for growth"
              delay={0.8}
              color="bg-yellow-500"
            />
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-20 bg-white/5 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnimatedStat value="99.9%" label="Uptime" delay={0.2} />
            <AnimatedStat value="10K+" label="Active Users" delay={0.4} />
            <AnimatedStat value="24/7" label="Support" delay={0.6} />
          </div>
        </div>
      </div>

      {/* Inventory Overview */}
      <div className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-16"
          >
            Inventory Overview
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <InventoryChart />
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-6"
              >
                <h3 className="text-xl font-semibold mb-4">Key Metrics</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Total Items</span>
                    <span className="font-semibold">1,234</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Low Stock Items</span>
                    <span className="font-semibold text-yellow-500">156</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Out of Stock</span>
                    <span className="font-semibold text-red-500">45</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 