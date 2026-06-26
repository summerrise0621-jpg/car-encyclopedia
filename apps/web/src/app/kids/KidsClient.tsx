'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import type { Brand, Series } from '@/types';

interface KidsClientProps {
  brands: Brand[];
  allSeries: Series[];
}

type Tab = 'gallery' | 'quiz' | 'categories' | 'stats';

export default function KidsClient({ brands, allSeries }: KidsClientProps) {
  const [activeTab, setActiveTab] = useState<Tab>('gallery');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');

  const regions = [
    { id: 'all', label: '🌍 全部', emoji: '🌍' },
    { id: 'europe', label: '🇪🇺 欧洲', emoji: '🇪🇺' },
    { id: 'usa', label: '🇺🇸 美国', emoji: '🇺🇸' },
    { id: 'japan', label: '🇯🇵 日本', emoji: '🇯🇵' },
    { id: 'china', label: '🇨🇳 中国', emoji: '🇨🇳' },
    { id: 'korea', label: '🇰🇷 韩国', emoji: '🇰🇷' },
  ];

  const filteredBrands = brands.filter(b => {
    const matchesSearch = b.name_cn.includes(searchTerm) || 
                         b.name_en.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = selectedRegion === 'all' || b.region === selectedRegion;
    return matchesSearch && matchesRegion;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            🚗 儿童汽车乐园 🎮
          </h1>
          <p className="text-xl opacity-90">
            快来认识各种汽车品牌，学习有趣的汽车知识吧！
          </p>
        </div>
      </section>

      {/* Tab Navigation */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {[
            { id: 'gallery' as Tab, label: '🎨 车标大全', desc: '认识所有汽车品牌' },
            { id: 'quiz' as Tab, label: '🎯 看车识品牌', desc: '测试你的汽车知识' },
            { id: 'categories' as Tab, label: '🚙 汽车分类', desc: '了解不同车型' },
            { id: 'stats' as Tab, label: '📊 趣味统计', desc: '汽车数据大揭秘' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-xl font-bold transition-all ${
                activeTab === tab.id
                  ? 'bg-white shadow-lg scale-105 text-purple-600'
                  : 'bg-white/50 hover:bg-white/80 text-gray-700'
              }`}
            >
              <div className="text-lg">{tab.label}</div>
              <div className="text-xs opacity-75">{tab.desc}</div>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'gallery' && (
          <LogoGallery 
            brands={filteredBrands}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedRegion={selectedRegion}
            setSelectedRegion={setSelectedRegion}
            regions={regions}
          />
        )}
        {activeTab === 'quiz' && <LogoQuiz brands={brands} allSeries={allSeries} />}
        {activeTab === 'categories' && <CarCategories brands={brands} allSeries={allSeries} />}
        {activeTab === 'stats' && <FunStats brands={brands} allSeries={allSeries} />}
      </div>
    </div>
  );
}

// Logo Gallery Component
function LogoGallery({ 
  brands, searchTerm, setSearchTerm, selectedRegion, setSelectedRegion, regions 
}: {
  brands: Brand[];
  searchTerm: string;
  setSearchTerm: (s: string) => void;
  selectedRegion: string;
  setSelectedRegion: (r: string) => void;
  regions: { id: string; label: string; emoji: string }[];
}) {
  return (
    <div>
      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1">
          <input
            type="text"
            placeholder="🔍 搜索品牌名称..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border-2 border-purple-200 focus:border-purple-500 focus:outline-none text-lg"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {regions.map(region => (
            <button
              key={region.id}
              onClick={() => setSelectedRegion(region.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedRegion === region.id
                  ? 'bg-purple-500 text-white shadow-md'
                  : 'bg-white hover:bg-purple-100'
              }`}
            >
              {region.label}
            </button>
          ))}
        </div>
      </div>

      {/* Brand Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {brands.map(brand => (
          <Link
            key={brand.id}
            href={`/brand/${brand.id}`}
            className="group bg-white rounded-2xl p-4 shadow-md hover:shadow-xl transition-all hover:scale-105 text-center"
          >
            <div className="w-20 h-20 mx-auto mb-3 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl flex items-center justify-center overflow-hidden">
              <img
                src={brand.logo}
                alt={brand.name_cn}
                className="w-16 h-16 object-contain group-hover:scale-110 transition-transform"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    parent.innerHTML = `<span class="text-3xl font-bold text-purple-500">${brand.name_cn.charAt(0)}</span>`;
                  }
                }}
              />
            </div>
            <h3 className="font-bold text-gray-800 group-hover:text-purple-600 transition-colors">
              {brand.name_cn}
            </h3>
            <p className="text-xs text-gray-500 mt-1">{brand.name_en}</p>
            <div className="mt-2">
              <span className="text-xs px-2 py-1 bg-purple-100 text-purple-600 rounded-full">
                {regions.find(r => r.id === brand.region)?.emoji} {brand.country}
              </span>
            </div>
          </Link>
        ))}
      </div>

      {brands.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <p className="text-2xl mb-2">🔍</p>
          <p>没有找到匹配的品牌，试试其他搜索词吧！</p>
        </div>
      )}
    </div>
  );
}

// Logo Quiz Game Component
function LogoQuiz({ brands, allSeries }: { brands: Brand[]; allSeries: Series[] }) {
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'result'>('menu');
  const [quizType, setQuizType] = useState<'logo' | 'car'>('logo');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [totalQuestions] = useState(10);
  const [questions, setQuestions] = useState<any[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const generateQuestions = useCallback((type: 'logo' | 'car') => {
    const shuffled = [...brands].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, totalQuestions);
    
    return selected.map(brand => {
      const wrongAnswers = brands
        .filter(b => b.id !== brand.id)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map(b => b.name_cn);
      
      const options = [brand.name_cn, ...wrongAnswers].sort(() => Math.random() - 0.5);
      
      return {
        brand,
        options,
        correctAnswer: brand.name_cn,
        image: type === 'logo' ? brand.logo : `/series/${allSeries.find(s => s.brand_id === brand.id)?.id || 'placeholder'}.jpg`,
      };
    });
  }, [brands, allSeries, totalQuestions]);

  const startGame = (type: 'logo' | 'car') => {
    setQuizType(type);
    const newQuestions = generateQuestions(type);
    setQuestions(newQuestions);
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setGameState('playing');
  };

  const handleAnswer = (answer: string) => {
    if (selectedAnswer) return; // Already answered
    
    setSelectedAnswer(answer);
    setShowExplanation(true);
    
    if (answer === questions[currentQuestion].correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion + 1 >= totalQuestions) {
      setGameState('result');
    } else {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  if (gameState === 'menu') {
    return (
      <div className="text-center py-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">🎯 选择游戏模式</h2>
        <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          <button
            onClick={() => startGame('logo')}
            className="bg-gradient-to-br from-blue-400 to-blue-600 text-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:scale-105"
          >
            <div className="text-5xl mb-4">🎨</div>
            <h3 className="text-2xl font-bold mb-2">看车标猜品牌</h3>
            <p className="opacity-90">看车标图案，选出正确的品牌名称</p>
          </button>
          <button
            onClick={() => startGame('car')}
            className="bg-gradient-to-br from-purple-400 to-purple-600 text-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:scale-105"
          >
            <div className="text-5xl mb-4">🚗</div>
            <h3 className="text-2xl font-bold mb-2">看车型猜品牌</h3>
            <p className="opacity-90">看汽车照片，猜猜它是什么品牌</p>
          </button>
        </div>
      </div>
    );
  }

  if (gameState === 'result') {
    const percentage = Math.round((score / totalQuestions) * 100);
    const grade = percentage >= 90 ? '🏆 汽车大师' :
                  percentage >= 70 ? '🥇 汽车专家' :
                  percentage >= 50 ? '🥈 汽车爱好者' :
                  '🥉 继续加油';
    
    return (
      <div className="text-center py-12">
        <div className="bg-white rounded-3xl shadow-xl p-8 max-w-md mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">游戏结束！</h2>
          <div className="text-6xl font-bold text-purple-600 my-6">
            {score}/{totalQuestions}
          </div>
          <p className="text-xl text-gray-600 mb-2">正确率: {percentage}%</p>
          <p className="text-2xl font-bold text-purple-600 mb-8">{grade}</p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => startGame(quizType)}
              className="px-6 py-3 bg-purple-500 text-white rounded-xl font-bold hover:bg-purple-600 transition-colors"
            >
              再玩一次
            </button>
            <button
              onClick={() => setGameState('menu')}
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-300 transition-colors"
            >
              返回菜单
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Playing state
  const question = questions[currentQuestion];
  if (!question) return null;

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-500">
            第 {currentQuestion + 1}/{totalQuestions} 题
          </span>
          <span className="text-sm font-bold text-purple-600">
            得分: {score}
          </span>
        </div>
        <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">
          {quizType === 'logo' ? '这是哪个品牌的车标？' : '这是哪个品牌的汽车？'}
        </h3>
        <div className="w-48 h-48 mx-auto bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl flex items-center justify-center overflow-hidden mb-6">
          <img
            src={question.image}
            alt="猜猜这是什么品牌"
            className="w-40 h-40 object-contain"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const parent = target.parentElement;
              if (parent) {
                parent.innerHTML = `<span class="text-6xl">🚗</span>`;
              }
            }}
          />
        </div>

        {/* Options */}
        <div className="grid grid-cols-2 gap-3">
          {question.options.map((option: string, index: number) => {
            const isCorrect = option === question.correctAnswer;
            const isSelected = option === selectedAnswer;
            
            let buttonClass = "p-4 rounded-xl font-bold text-lg transition-all ";
            
            if (showExplanation) {
              if (isCorrect) {
                buttonClass += "bg-green-500 text-white";
              } else if (isSelected && !isCorrect) {
                buttonClass += "bg-red-500 text-white";
              } else {
                buttonClass += "bg-gray-100 text-gray-400";
              }
            } else {
              buttonClass += "bg-gray-100 hover:bg-purple-100 hover:text-purple-600 cursor-pointer";
            }

            return (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                disabled={showExplanation}
                className={buttonClass}
              >
                {option}
                {showExplanation && isCorrect && ' ✓'}
                {showExplanation && isSelected && !isCorrect && ' ✗'}
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {showExplanation && (
          <div className="mt-6 p-4 bg-purple-50 rounded-xl">
            <p className="text-purple-800 font-medium">
              {selectedAnswer === question.correctAnswer
                ? '🎉 回答正确！太棒了！'
                : `😅 答错了！正确答案是: ${question.correctAnswer}`}
            </p>
            <p className="text-sm text-purple-600 mt-2">
              {question.brand.name_cn}来自{question.brand.country}，成立于{question.brand.founded_year}年
            </p>
            <button
              onClick={nextQuestion}
              className="mt-4 w-full py-3 bg-purple-500 text-white rounded-xl font-bold hover:bg-purple-600 transition-colors"
            >
              {currentQuestion + 1 >= totalQuestions ? '查看成绩' : '下一题'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// Car Categories Component
function CarCategories({ brands, allSeries }: { brands: Brand[]; allSeries: Series[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [
    { id: 'sedan', label: '轿车', emoji: '🚗', desc: '最常见的家用车类型' },
    { id: 'suv', label: 'SUV', emoji: '🚙', desc: '空间大、通过性好的多功能车' },
    { id: 'mpv', label: 'MPV', emoji: '🚐', desc: '适合全家出行的商务车' },
    { id: 'coupe', label: '跑车', emoji: '🏎️', desc: '追求速度与激情的运动车' },
    { id: 'convertible', label: '敞篷', emoji: '🌤️', desc: '可以打开车顶的拉风车' },
    { id: 'hatchback', label: '两厢', emoji: '🚘', desc: '小巧灵活的城市用车' },
    { id: 'wagon', label: '旅行车', emoji: '🏕️', desc: '兼顾舒适与实用的长途车' },
    { id: 'pickup', label: '皮卡', emoji: '🛻', desc: '能拉货能越野的工具车' },
  ];

  const categoryStats = categories.map(cat => ({
    ...cat,
    count: allSeries.filter(s => s.category === cat.id).length,
  }));

  const filteredSeries = selectedCategory
    ? allSeries.filter(s => s.category === selectedCategory)
    : [];

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">🚙 认识不同类型的汽车</h2>
      
      {/* Category Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {categoryStats.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}
            className={`p-6 rounded-2xl transition-all ${
              selectedCategory === cat.id
                ? 'bg-purple-500 text-white shadow-lg scale-105'
                : 'bg-white hover:bg-purple-50 shadow-md'
            }`}
          >
            <div className="text-4xl mb-3">{cat.emoji}</div>
            <h3 className="font-bold text-lg">{cat.label}</h3>
            <p className={`text-sm mt-1 ${selectedCategory === cat.id ? 'opacity-90' : 'text-gray-500'}`}>
              {cat.desc}
            </p>
            <div className={`mt-3 text-sm font-bold ${selectedCategory === cat.id ? 'text-white' : 'text-purple-500'}`}>
              {cat.count} 个车系
            </div>
          </button>
        ))}
      </div>

      {/* Series List for Selected Category */}
      {selectedCategory && (
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            {categories.find(c => c.id === selectedCategory)?.emoji}{' '}
            {categories.find(c => c.id === selectedCategory)?.label}车型
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredSeries.slice(0, 12).map(series => {
              const brand = brands.find(b => b.id === series.brand_id);
              return (
                <Link
                  key={series.id}
                  href={`/series/${series.id}`}
                  className="group bg-gray-50 rounded-xl p-3 hover:bg-purple-50 transition-colors"
                >
                  <div className="w-full h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center overflow-hidden mb-2">
                    <img
                      src={series.image || `/series/${series.id}.jpg`}
                      alt={series.name_cn}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          parent.innerHTML = `<span class="text-3xl">${categories.find(c => c.id === selectedCategory)?.emoji || '🚗'}</span>`;
                        }
                      }}
                    />
                  </div>
                  <p className="font-medium text-sm text-gray-800 group-hover:text-purple-600">
                    {brand?.name_cn} {series.name_cn}
                  </p>
                </Link>
              );
            })}
          </div>
          {filteredSeries.length > 12 && (
            <p className="text-center text-gray-500 mt-4">
              还有 {filteredSeries.length - 12} 个车型...
            </p>
          )}
        </div>
      )}
    </div>
  );
}

// Fun Stats Component
function FunStats({ brands, allSeries }: { brands: Brand[]; allSeries: Series[] }) {
  const stats = [
    {
      title: '🌍 全球品牌',
      value: brands.length,
      suffix: '个',
      desc: '来自世界各地的知名汽车品牌',
      color: 'from-blue-400 to-blue-600',
    },
    {
      title: '🚗 车型系列',
      value: allSeries.length,
      suffix: '个',
      desc: '涵盖各种类型的汽车',
      color: 'from-purple-400 to-purple-600',
    },
    {
      title: '⚡ 最快车型',
      value: Math.min(...allSeries.flatMap(s => 
        s.generations.flatMap(g => 
          g.variants.map(v => v.specs.zero_to_hundred || 99)
        )
      )),
      suffix: '秒',
      desc: '0-100km/h加速时间',
      color: 'from-red-400 to-red-600',
    },
    {
      title: '🏎️ 最高速度',
      value: Math.max(...allSeries.flatMap(s => 
        s.generations.flatMap(g => 
          g.variants.map(v => v.specs.top_speed || 0)
        )
      )),
      suffix: 'km/h',
      desc: '最高时速记录',
      color: 'from-orange-400 to-orange-600',
    },
  ];

  const regionStats = [
    { region: 'europe', label: '🇪🇺 欧洲', color: 'bg-blue-500' },
    { region: 'usa', label: '🇺🇸 美国', color: 'bg-red-500' },
    { region: 'japan', label: '🇯🇵 日本', color: 'bg-pink-500' },
    { region: 'china', label: '🇨🇳 中国', color: 'bg-yellow-500' },
    { region: 'korea', label: '🇰🇷 韩国', color: 'bg-green-500' },
  ].map(r => ({
    ...r,
    count: brands.filter(b => b.region === r.region).length,
    percentage: Math.round((brands.filter(b => b.region === r.region).length / brands.length) * 100),
  }));

  const powertrainStats = [
    { type: 'petrol', label: '燃油', emoji: '⛽', color: 'bg-gray-500' },
    { type: 'diesel', label: '柴油', emoji: '🛢️', color: 'bg-yellow-600' },
    { type: 'hybrid', label: '混动', emoji: '🔋', color: 'bg-green-500' },
    { type: 'phev', label: '插混', emoji: '🔌', color: 'bg-blue-500' },
    { type: 'bev', label: '纯电', emoji: '⚡', color: 'bg-purple-500' },
  ].map(p => ({
    ...p,
    count: allSeries.flatMap(s => s.generations.flatMap(g => g.variants)).filter(v => v.powertrain === p.type).length,
  }));

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">📊 汽车数据大揭秘</h2>
      
      {/* Main Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`bg-gradient-to-br ${stat.color} text-white rounded-2xl p-6 shadow-lg`}
          >
            <h3 className="text-lg font-bold mb-2">{stat.title}</h3>
            <div className="text-4xl font-bold mb-1">
              {stat.value}
              <span className="text-lg ml-1">{stat.suffix}</span>
            </div>
            <p className="text-sm opacity-90">{stat.desc}</p>
          </div>
        ))}
      </div>

      {/* Region Distribution */}
      <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
        <h3 className="text-xl font-bold text-gray-800 mb-4">🌍 品牌来自哪里？</h3>
        <div className="space-y-4">
          {regionStats.sort((a, b) => b.count - a.count).map(region => (
            <div key={region.region}>
              <div className="flex justify-between items-center mb-1">
                <span className="font-medium">{region.label}</span>
                <span className="text-sm text-gray-500">{region.count} 个品牌 ({region.percentage}%)</span>
              </div>
              <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full ${region.color} rounded-full transition-all duration-500`}
                  style={{ width: `${region.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Powertrain Distribution */}
      <div className="bg-white rounded-2xl shadow-xl p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">⚡ 动力类型分布</h3>
        <div className="grid grid-cols-5 gap-4">
          {powertrainStats.map(pt => (
            <div key={pt.type} className="text-center">
              <div className="text-3xl mb-2">{pt.emoji}</div>
              <div className={`text-2xl font-bold text-gray-800`}>{pt.count}</div>
              <div className="text-sm text-gray-500">{pt.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
