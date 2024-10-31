import { useEffect, useState } from 'react';
import { RefreshCw, Download, Star } from 'lucide-react';
import AvatarCanvas from './components/AvatarCanvas';
import { getRandomAvatarOption } from './utils/avatar-option';
import Footer from './components/Footer';
import { Switch } from './components/Switch';

function App() {
  const [features, setFeatures] = useState<any>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [isAnimated, setIsAnimated] = useState(true);

  useEffect(() => {
    const randomOption = getRandomAvatarOption()
    setFeatures(randomOption)
  }, [])

  const regenerateAvatar = () => {
    const randomOption = getRandomAvatarOption()
    setFeatures(randomOption)
  };

  const downloadAvatar = () => {
    const svg = document.querySelector('#avatar-svg');
    if (!svg) return;

    const serializer = new XMLSerializer();
    const svgStr = serializer.serializeToString(svg);
    const blob = new Blob([svgStr], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'my-avatar.svg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleRefresh = async () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-indigo-50 py-12 px-4">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Animated Art Avatar
          </h1>
          <p className="text-gray-600">
          Minimalist Animated Line Art Avatar Generator
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-5">
          {/* 添加动画控制开关 */}
          <div className="flex items-center justify-end mb-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Animation</span>
              <Switch
                checked={isAnimated}
                onChange={setIsAnimated}
                className="relative inline-flex h-5 w-9"
              />
            </div>
          </div>

          <div className="aspect-square w-full mb-6 bg-gray-50 rounded-xl p-4 flex items-center justify-center">
            <AvatarCanvas 
              features={features} 
              key={refreshKey}
              isAnimated={isAnimated}
            />
          </div>

          <div className="flex justify-center items-center gap-3">
            {/* Generate Button */}
            <button
              onClick={regenerateAvatar}
              className="group flex items-center gap-2.5 px-4 py-2 
                         bg-gradient-to-r from-indigo-500 to-purple-500 
                         text-white rounded-full shadow-sm 
                         hover:shadow-md hover:from-indigo-600 hover:to-purple-600
                         transition-all duration-200 ease-in-out"
            >
              <Star 
                size={16} 
                className="group-hover:scale-110 transition-transform duration-300" 
              />
              <span className="font-medium text-sm">Generate</span>
            </button>

            {/* Divider */}
            <div className="h-6 w-px bg-gray-200 dark:bg-gray-700" />

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              {/* Refresh Button */}
              <button
                onClick={handleRefresh}
                className="group flex items-center gap-2 px-3 py-2 
                             bg-white text-gray-600 rounded-full 
                             border border-gray-200 
                             hover:bg-gray-50 hover:border-gray-300
                             transition-all duration-200 ease-in-out
                             disabled:opacity-60 disabled:cursor-not-allowed
                             dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700
                             dark:hover:bg-gray-750"
              >
                <RefreshCw 
                  size={16} 
                  className="group-hover:rotate-180 transition-transform duration-500"
                />
                <span className="font-medium text-sm">Refresh</span>
              </button>

              {/* Download Button */}
              <button
                onClick={downloadAvatar}
                className="group flex items-center gap-2 px-3 py-2 
                             bg-gray-900 text-white rounded-full 
                             shadow-sm hover:shadow-md hover:bg-black
                             transition-all duration-200 ease-in-out
                             dark:bg-white dark:text-gray-800 dark:hover:bg-gray-100"
              >
                <Download 
                  size={16} 
                  className="group-hover:translate-y-0.5 transition-transform duration-200" 
                />
                <span className="font-medium text-sm">Download</span>
              </button>
            </div>
          </div>
        </div>

        <div className="text-center text-sm text-gray-500">
          Click generate for a new avatar, Download for the svg file.
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
