import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  Clock, 
  Target, 
  TrendingUp, 
  User, 
  Settings, 
  LogOut,
  Play,
  BarChart3,
  Award,
  Calendar
} from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const [userStats, setUserStats] = useState({
    testsCompleted: 12,
    averageScore: 78,
    timeSpent: 24, // hours
    streak: 7, // days
    plan: localStorage.getItem('userPlan') || 'Pro',
    nextExam: 'NISM Series V-A'
  });

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [navigate]);

  const modules = [
    {
      id: 1,
      title: "Mutual Funds Basics",
      series: "Series V-A",
      progress: 75,
      questionsAnswered: 120,
      totalQuestions: 150,
      lastAccessed: "2 hours ago",
      difficulty: "Beginner",
      status: "In Progress"
    },
    {
      id: 2,
      title: "Equity Derivatives",
      series: "Series VIII",
      progress: 45,
      questionsAnswered: 90,
      totalQuestions: 200,
      lastAccessed: "1 day ago",
      difficulty: "Advanced",
      status: "In Progress"
    },
    {
      id: 3,
      title: "Currency Derivatives",
      series: "Series IV",
      progress: 0,
      questionsAnswered: 0,
      totalQuestions: 100,
      lastAccessed: "Never",
      difficulty: "Intermediate",
      status: "Not Started"
    }
  ];

  const recentTests = [
    {
      id: 1,
      name: "Mutual Funds Practice Test 5",
      score: 85,
      totalQuestions: 25,
      timeTaken: "18 min",
      date: "Today",
      type: "Practice"
    },
    {
      id: 2,
      name: "Equity Derivatives Mock Test 1",
      score: 72,
      totalQuestions: 50,
      timeTaken: "28 min",
      date: "Yesterday",
      type: "Mock"
    },
    {
      id: 3,
      name: "Mutual Funds Practice Test 4",
      score: 91,
      totalQuestions: 25,
      timeTaken: "15 min",
      date: "2 days ago",
      type: "Practice"
    }
  ];

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Not Started':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    return type === 'Mock' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800';
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-background border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold text-gradient">
              NISM Prep
            </Link>
            
            <div className="flex items-center space-x-4">
              <Badge className="bg-primary/10 text-primary">{userStats.plan} Plan</Badge>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, {localStorage.getItem('userName') || 'Student'}!
          </h1>
          <p className="text-muted-foreground">
            Continue your NISM preparation journey. You're doing great!
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Tests Completed</p>
                  <p className="text-2xl font-bold">{userStats.testsCompleted}</p>
                </div>
                <Target className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Average Score</p>
                  <p className="text-2xl font-bold">{userStats.averageScore}%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Study Time</p>
                  <p className="text-2xl font-bold">{userStats.timeSpent}h</p>
                </div>
                <Clock className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Study Streak</p>
                  <p className="text-2xl font-bold">{userStats.streak} days</p>
                </div>
                <Award className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Learning Modules */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="h-5 w-5 mr-2" />
                  Your Learning Modules
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {modules.map((module) => (
                  <div key={module.id} className="border border-border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-semibold">{module.title}</h3>
                        <p className="text-sm text-muted-foreground">{module.series}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusColor(module.status)}>
                          {module.status}
                        </Badge>
                        <Badge variant="outline">{module.difficulty}</Badge>
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span>Progress: {module.questionsAnswered}/{module.totalQuestions} questions</span>
                        <span>{module.progress}%</span>
                      </div>
                      <Progress value={module.progress} className="h-2" />
                      <p className="text-xs text-muted-foreground">
                        Last accessed: {module.lastAccessed}
                      </p>
                    </div>

                    <div className="flex space-x-2">
                      <Button size="sm" className="btn-gradient">
                        <Play className="h-4 w-4 mr-2" />
                        Continue
                      </Button>
                      <Button variant="outline" size="sm">
                        <BarChart3 className="h-4 w-4 mr-2" />
                        View Stats
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Tests */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Recent Test Results
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTests.map((test) => (
                    <div key={test.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium">{test.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {test.date} • {test.timeTaken} • {test.totalQuestions} questions
                        </p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge className={getTypeColor(test.type)}>
                          {test.type}
                        </Badge>
                        <div className="text-right">
                          <div className="font-semibold">{test.score}%</div>
                          <div className="text-xs text-muted-foreground">Score</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4">
                  View All Results
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full btn-gradient">
                  <Play className="h-4 w-4 mr-2" />
                  Start Practice Test
                </Button>
                <Button variant="outline" className="w-full">
                  <Clock className="h-4 w-4 mr-2" />
                  Take Mock Exam
                </Button>
                <Button variant="outline" className="w-full">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  View Analytics
                </Button>
              </CardContent>
            </Card>

            {/* Next Exam Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Exam Preparation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-3">
                  <div className="text-2xl font-bold text-primary">
                    {userStats.nextExam}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Your next targeted exam
                  </p>
                  <div className="bg-primary/5 p-4 rounded-lg">
                    <p className="text-sm">
                      <strong>Readiness Level:</strong> 75%
                    </p>
                    <Progress value={75} className="mt-2" />
                  </div>
                  <Button variant="outline" className="w-full">
                    Schedule Exam
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Study Tip */}
            <Card className="bg-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="text-sm">💡 Study Tip</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  Take regular breaks during study sessions. The Pomodoro Technique (25 min study + 5 min break) can improve retention significantly.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;