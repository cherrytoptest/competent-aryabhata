import { useState, useEffect } from "react";
import { Button } from "/components/ui/button";
import { Card } from "/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "/components/ui/tabs";
import { Slider } from "/components/ui/slider";
import { Switch } from "/components/ui/switch";
import { Label } from "/components/ui/label";
import { RadioGroup, RadioGroupItem } from "/components/ui/radio-group";
import { Headphones, Volume2, Sun, Moon, Users, UserPlus, BookOpen, Coffee, Tree, Wind, CloudRain } from "lucide-react";

export default function VRStudySpaces() {
  const [currentEnvironment, setCurrentEnvironment] = useState("library");
  const [timeOfDay, setTimeOfDay] = useState("day");
  const [ambientNoise, setAmbientNoise] = useState(30);
  const [showTips, setShowTips] = useState(true);
  const [hasCompanions, setHasCompanions] = useState(false);
  const [isVRMode, setIsVRMode] = useState(false);
  const [weatherEffect, setWeatherEffect] = useState("clear");

  // Animation for environment transitions
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setIsTransitioning(true);
    const timer = setTimeout(() => setIsTransitioning(false), 1000);
    return () => clearTimeout(timer);
  }, [currentEnvironment, timeOfDay, weatherEffect]);

  // Study tips based on environment
  const studyTips = {
    library: "Libraries promote focus through their quiet atmosphere and academic surroundings.",
    forest: "Natural settings can reduce stress and improve concentration and creativity.",
    cafe: "Ambient noise in cafes can enhance creativity for some people.",
    beach: "The sound of waves can be calming and help with stress reduction."
  };

  // Background images for different environments and times of day
  const getBackgroundImage = () => {
    const weatherSuffix = weatherEffect !== "clear" && currentEnvironment !== "library" ? `-${weatherEffect}` : "";
    return `url(/api/placeholder/1200/600?text=${currentEnvironment}-${timeOfDay}${weatherSuffix})`;
  };

  const handleEnvironmentChange = (env) => {
    setCurrentEnvironment(env);
    // Reset weather effect when changing to library
    if (env === "library") {
      setWeatherEffect("clear");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <header className="bg-slate-800 p-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <BookOpen className="h-6 w-6 text-blue-400" />
          <h1 className="text-xl font-bold">VR Study Spaces</h1>
        </div>
        <div className="flex items-center space-x-4">
          <Switch 
            id="vr-mode" 
            checked={isVRMode} 
            onCheckedChange={setIsVRMode} 
          />
          <Label htmlFor="vr-mode" className="text-sm font-medium">
            {isVRMode ? "VR Mode On" : "VR Mode Off"}
          </Label>
          <Button variant="outline" size="sm" className="border-blue-500 text-blue-400">
            Sign In
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-1">
        {/* Environment Display */}
        <div className="flex-1 relative overflow-hidden">
          <div 
            className={`w-full h-full bg-cover bg-center transition-opacity duration-1000 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
            style={{ 
              backgroundImage: getBackgroundImage(),
              minHeight: "500px"
            }}
          >
            {/* Overlay for VR mode */}
            {isVRMode && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="text-center p-6 bg-slate-800 bg-opacity-80 rounded-lg max-w-md">
                  <h2 className="text-2xl font-bold mb-4">VR Mode Active</h2>
                  <p className="mb-4">Please put on your VR headset to enter the immersive study environment.</p>
                  <Button 
                    onClick={() => setIsVRMode(false)}
                    variant="destructive"
                  >
                    Exit VR Mode
                  </Button>
                </div>
              </div>
            )}

            {/* Environment elements */}
            {hasCompanions && !isVRMode && (
              <div className="absolute bottom-4 left-4 bg-slate-800 bg-opacity-60 p-2 rounded-full">
                <Users className="h-8 w-8 text-blue-400" />
              </div>
            )}

            {/* Weather effects */}
            {weatherEffect === "rain" && currentEnvironment !== "library" && (
              <div className="absolute inset-0 pointer-events-none">
                <div className="rain"></div>
              </div>
            )}
            
            {weatherEffect === "wind" && currentEnvironment !== "library" && (
              <div className="absolute top-4 right-4 animate-pulse">
                <Wind className="h-8 w-8 text-white opacity-70" />
              </div>
            )}

            {/* Time of day indicator */}
            <div className="absolute top-4 left-4 bg-slate-800 bg-opacity-60 p-2 rounded-full">
              {timeOfDay === "day" ? (
                <Sun className="h-6 w-6 text-yellow-400" />
              ) : (
                <Moon className="h-6 w-6 text-blue-200" />
              )}
            </div>
          </div>
        </div>

        {/* Controls Panel */}
        <div className="w-80 bg-slate-800 p-4 overflow-y-auto">
          <h2 className="text-xl font-bold mb-4">Customize Your Space</h2>
          
          <div className="space-y-6">
            {/* Environment Selection */}
            <div>
              <h3 className="text-sm font-medium mb-2">Study Environment</h3>
              <Tabs defaultValue={currentEnvironment} onValueChange={handleEnvironmentChange}>
                <TabsList className="grid grid-cols-4 mb-2">
                  <TabsTrigger value="library">Library</TabsTrigger>
                  <TabsTrigger value="forest">Forest</TabsTrigger>
                  <TabsTrigger value="cafe">Café</TabsTrigger>
                  <TabsTrigger value="beach">Beach</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* Time of Day */}
            <div>
              <h3 className="text-sm font-medium mb-2">Time of Day</h3>
              <div className="flex items-center space-x-2">
                <Button 
                  variant={timeOfDay === "day" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setTimeOfDay("day")}
                  className="flex-1"
                >
                  <Sun className="h-4 w-4 mr-2" />
                  Day
                </Button>
                <Button 
                  variant={timeOfDay === "night" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setTimeOfDay("night")}
                  className="flex-1"
                >
                  <Moon className="h-4 w-4 mr-2" />
                  Night
                </Button>
              </div>
            </div>

            {/* Weather Effects (for outdoor environments) */}
            {currentEnvironment !== "library" && (
              <div>
                <h3 className="text-sm font-medium mb-2">Weather Effects</h3>
                <RadioGroup value={weatherEffect} onValueChange={setWeatherEffect}>
                  <div className="flex items-center space-x-2 mb-2">
                    <RadioGroupItem value="clear" id="weather-clear" />
                    <Label htmlFor="weather-clear" className="flex items-center">
                      <Sun className="h-4 w-4 mr-2 text-yellow-400" />
                      Clear
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <RadioGroupItem value="rain" id="weather-rain" />
                    <Label htmlFor="weather-rain" className="flex items-center">
                      <CloudRain className="h-4 w-4 mr-2 text-blue-400" />
                      Gentle Rain
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="wind" id="weather-wind" />
                    <Label htmlFor="weather-wind" className="flex items-center">
                      <Wind className="h-4 w-4 mr-2 text-gray-400" />
                      Light Breeze
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            )}

            {/* Ambient Sound */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium">Ambient Sound</h3>
                <Volume2 className="h-4 w-4" />
              </div>
              <Slider
                value={[ambientNoise]}
                max={100}
                step={1}
                onValueChange={(value) => setAmbientNoise(value[0])}
              />
              <div className="flex justify-between text-xs mt-1">
                <span>Silent</span>
                <span>Ambient</span>
              </div>
            </div>

            {/* Study Companions */}
            <div className="flex items-center space-x-2">
              <Switch 
                id="companions" 
                checked={hasCompanions} 
                onCheckedChange={setHasCompanions} 
              />
              <Label htmlFor="companions" className="text-sm font-medium flex items-center">
                <UserPlus className="h-4 w-4 mr-2" />
                Virtual Study Companions
              </Label>
            </div>

            {/* Study Tips */}
            <div className="flex items-center space-x-2 mb-2">
              <Switch 
                id="show-tips" 
                checked={showTips} 
                onCheckedChange={setShowTips} 
              />
              <Label htmlFor="show-tips" className="text-sm font-medium">Show Study Tips</Label>
            </div>

            {showTips && (
              <Card className="bg-slate-700 p-3 border-none">
                <div className="flex items-start space-x-3">
                  <div className="mt-1">
                    {currentEnvironment === "library" && <BookOpen className="h-5 w-5 text-blue-400" />}
                    {currentEnvironment === "forest" && <Tree className="h-5 w-5 text-green-400" />}
                    {currentEnvironment === "cafe" && <Coffee className="h-5 w-5 text-yellow-600" />}
                    {currentEnvironment === "beach" && <Wind className="h-5 w-5 text-blue-300" />}
                  </div>
                  <p className="text-sm">{studyTips[currentEnvironment]}</p>
                </div>
              </Card>
            )}

            {/* Enter VR Mode Button */}
            <Button 
              className="w-full bg-blue-600 hover:bg-blue-700 mt-4"
              onClick={() => setIsVRMode(true)}
              disabled={isVRMode}
            >
              <Headphones className="h-4 w-4 mr-2" />
              Enter VR Study Mode
            </Button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-800 p-3 text-center text-sm text-slate-400">
        VR Study Spaces © 2023 - Enhance your focus and productivity with immersive study environments
      </footer>

      <style jsx>{`
        .rain {
          position: absolute;
          width: 100%;
          height: 100%;
          background: linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.3) 100%);
          background-size: 20px 100%;
          animation: rain 0.5s linear infinite;
          opacity: 0.5;
        }
        
        @keyframes rain {
          0% { background-position: 0 0; }
          100% { background-position: 0 100%; }
        }
      `}</style>
    </div>
  );
}