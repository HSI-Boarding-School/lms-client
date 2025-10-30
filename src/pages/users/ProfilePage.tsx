import React, { useEffect, useState } from "react";
import { Card } from "../../components/ui/CardPrimary";
import { Button } from "../../components/ui/Button";
import { useUser } from "../../hooks/useData";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  CreditCard as Edit3,
  Save,
  X,
  Camera,
  Bell,
  Shield,
  Globe,
  Moon,
  Sun,
  Eye,
  EyeOff,
  Award,
  BookOpen,
  Clock,
  Target,
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { useAuthStore } from "@/store/authStore";

export const ProfilePage: React.FC = () => {

  const {user: userDataById, fetchUser} = useAuthStore();

  useEffect(() => {
    fetchUser();
  }, [])

  const { data: user } = useUser();
  const { darkMode, toggleDarkMode } = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    bio: "Passionate learner focused on web development and data science. Always eager to explore new technologies and methodologies.",
    website: "https://alexjohnson.dev",
    linkedin: "https://linkedin.com/in/alexjohnson",
    github: "https://github.com/alexjohnson",
  });

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    pushNotifications: false,
    courseReminders: true,
    weeklyDigest: true,
    language: "English",
    timezone: "Pacific Time (PT)",
    privacy: "public",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePreferenceChange = (field: string, value: boolean | string) => {
    setPreferences((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    // Here you would typically save to backend
    setIsEditing(false);
  };

  const stats = [
    {
      label: "Courses Completed",
      value: "12",
      icon: BookOpen,
      color: "text-blue-600",
    },
    {
      label: "Hours Learned",
      value: "156",
      icon: Clock,
      color: "text-green-600",
    },
    {
      label: "Certificates Earned",
      value: "8",
      icon: Award,
      color: "text-purple-600",
    },
    {
      label: "Current Streak",
      value: "23 days",
      icon: Target,
      color: "text-orange-600",
    },
  ];

  const achievements = [
    {
      title: "First Course Completed",
      description: "Completed your first course",
      date: "2024-01-15",
      icon: "🎓",
    },
    {
      title: "Speed Learner",
      description: "Completed 3 courses in one month",
      date: "2024-02-20",
      icon: "⚡",
    },
    {
      title: "Consistent Learner",
      description: "30-day learning streak",
      date: "2024-03-10",
      icon: "🔥",
    },
    {
      title: "Knowledge Seeker",
      description: "Enrolled in 10+ courses",
      date: "2024-03-25",
      icon: "📚",
    },
  ];

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "preferences", label: "Preferences", icon: Bell },
    { id: "security", label: "Security", icon: Shield },
    { id: "achievements", label: "Achievements", icon: Award },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 rounded-3xl p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.1%22%3E%3Ccircle cx=%227%22 cy=%227%22 r=%227%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30" />
        <div className="relative z-10">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <img
                  src={user?.avatar}
                  alt={user?.name}
                  className="h-24 w-24 rounded-2xl object-cover ring-4 ring-white/20"
                />
                <button className="absolute -bottom-2 -right-2 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors">
                  <Camera className="h-4 w-4" />
                </button>
              </div>
              <div>
                <h1 className="text-3xl font-bold mb-2 capitalize">{userDataById?.name}</h1>
                <p className="text-xl opacity-90 font-bold mb-1 capitalize">
                  {userDataById?.roles.map(r => r.name).join(", ")}
                </p>
                <p className="opacity-75">{userDataById?.email}</p>
              </div>
            </div>
            <Button
              variant="secondary"
              className="bg-white/20 hover:bg-white/30 backdrop-blur-sm"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? (
                <X className="h-4 w-4 mr-2" />
              ) : (
                <Edit3 className="h-4 w-4 mr-2" />
              )}
              {isEditing ? "Cancel" : "Edit Profile"}
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card
            key={stat.label}
            className="p-6 text-center"
            style={{
              animationDelay: `${index * 100}ms`,
              animation: "slideUp 0.6s ease-out forwards",
            }}
          >
            <div
              className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gray-100 dark:bg-gray-800 mb-4 ${stat.color}`}
            >
              <stat.icon className="h-6 w-6" />
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {stat.value}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {stat.label}
            </p>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? "border-blue-500 text-blue-600 dark:text-blue-400"
                  : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              }`}
            >
              <tab.icon className="h-5 w-5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {activeTab === "profile" && (
          <>
            {/* Profile Information */}
            <div className="lg:col-span-2">
              <Card className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  Profile Information
                </h3>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Full Name
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) =>
                            handleInputChange("name", e.target.value)
                          }
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        />
                      ) : (
                        <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                          <User className="h-5 w-5 text-gray-400" />
                          <span className="text-gray-900 dark:text-white capitalize">
                            {userDataById?.name}
                          </span>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email Address
                      </label>
                      {isEditing ? (
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            handleInputChange("email", e.target.value)
                          }
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        />
                      ) : (
                        <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                          <Mail className="h-5 w-5 text-gray-400" />
                          <span className="text-gray-900 dark:text-white">
                            {userDataById?.email}
                          </span>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Phone Number
                      </label>
                      {isEditing ? (
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) =>
                            handleInputChange("phone", e.target.value)
                          }
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        />
                      ) : (
                        <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                          <Phone className="h-5 w-5 text-gray-400" />
                          <span className="text-gray-900 dark:text-white">
                            {formData.phone}
                          </span>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Location
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={formData.location}
                          onChange={(e) =>
                            handleInputChange("location", e.target.value)
                          }
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        />
                      ) : (
                        <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                          <MapPin className="h-5 w-5 text-gray-400" />
                          <span className="text-gray-900 dark:text-white">
                            {formData.location}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Bio
                    </label>
                    {isEditing ? (
                      <textarea
                        value={formData.bio}
                        onChange={(e) =>
                          handleInputChange("bio", e.target.value)
                        }
                        rows={4}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      />
                    ) : (
                      <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                        <p className="text-gray-900 dark:text-white">
                          {formData.bio}
                        </p>
                      </div>
                    )}
                  </div>

                  {isEditing && (
                    <div className="flex justify-end space-x-4">
                      <Button
                        variant="secondary"
                        onClick={() => setIsEditing(false)}
                      >
                        Cancel
                      </Button>
                      <Button variant="primary" onClick={handleSave}>
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </Button>
                    </div>
                  )}
                </div>
              </Card>
            </div>

            {/* Social Links */}
            <div>
              <Card className="p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                  Social Links
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Website
                    </label>
                    {isEditing ? (
                      <input
                        type="url"
                        value={formData.website}
                        onChange={(e) =>
                          handleInputChange("website", e.target.value)
                        }
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      />
                    ) : (
                      <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                        <Globe className="h-5 w-5 text-gray-400" />
                        <a
                          href={formData.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          {formData.website}
                        </a>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      LinkedIn
                    </label>
                    {isEditing ? (
                      <input
                        type="url"
                        value={formData.linkedin}
                        onChange={(e) =>
                          handleInputChange("linkedin", e.target.value)
                        }
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      />
                    ) : (
                      <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                        <a
                          href={formData.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          {formData.linkedin}
                        </a>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      GitHub
                    </label>
                    {isEditing ? (
                      <input
                        type="url"
                        value={formData.github}
                        onChange={(e) =>
                          handleInputChange("github", e.target.value)
                        }
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      />
                    ) : (
                      <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                        <a
                          href={formData.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          {formData.github}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            </div>
          </>
        )}

        {activeTab === "preferences" && (
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                  Notifications
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      key: "emailNotifications",
                      label: "Email Notifications",
                      description: "Receive notifications via email",
                    },
                    {
                      key: "pushNotifications",
                      label: "Push Notifications",
                      description: "Receive push notifications in browser",
                    },
                    {
                      key: "courseReminders",
                      label: "Course Reminders",
                      description: "Get reminded about upcoming lessons",
                    },
                    {
                      key: "weeklyDigest",
                      label: "Weekly Digest",
                      description: "Weekly summary of your progress",
                    },
                  ].map((pref) => (
                    <div
                      key={pref.key}
                      className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-xl"
                    >
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {pref.label}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {pref.description}
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          handlePreferenceChange(
                            pref.key,
                            !preferences[pref.key as keyof typeof preferences]
                          )
                        }
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          preferences[pref.key as keyof typeof preferences]
                            ? "bg-blue-600"
                            : "bg-gray-300 dark:bg-gray-600"
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            preferences[pref.key as keyof typeof preferences]
                              ? "translate-x-6"
                              : "translate-x-1"
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                  General Settings
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Language
                    </label>
                    <select
                      value={preferences.language}
                      onChange={(e) =>
                        handlePreferenceChange("language", e.target.value)
                      }
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    >
                      <option>English</option>
                      <option>Spanish</option>
                      <option>French</option>
                      <option>German</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Timezone
                    </label>
                    <select
                      value={preferences.timezone}
                      onChange={(e) =>
                        handlePreferenceChange("timezone", e.target.value)
                      }
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    >
                      <option>Pacific Time (PT)</option>
                      <option>Mountain Time (MT)</option>
                      <option>Central Time (CT)</option>
                      <option>Eastern Time (ET)</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                    <div className="flex items-center space-x-3">
                      {darkMode ? (
                        <Moon className="h-5 w-5 text-gray-400" />
                      ) : (
                        <Sun className="h-5 w-5 text-gray-400" />
                      )}
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          Dark Mode
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Toggle dark/light theme
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={toggleDarkMode}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        darkMode ? "bg-blue-600" : "bg-gray-300"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          darkMode ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}

        {activeTab === "security" && (
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                  Change Password
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Current Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        className="w-full px-4 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      New Password
                    </label>
                    <input
                      type="password"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>

                  <Button variant="primary" className="w-full">
                    Update Password
                  </Button>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                  Privacy Settings
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Profile Visibility
                    </label>
                    <select
                      value={preferences.privacy}
                      onChange={(e) =>
                        handlePreferenceChange("privacy", e.target.value)
                      }
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    >
                      <option value="public">Public</option>
                      <option value="private">Private</option>
                      <option value="friends">Friends Only</option>
                    </select>
                  </div>

                  <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-200 dark:border-yellow-800">
                    <div className="flex items-start space-x-3">
                      <Shield className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
                      <div>
                        <p className="font-medium text-yellow-800 dark:text-yellow-200">
                          Two-Factor Authentication
                        </p>
                        <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                          Add an extra layer of security to your account
                        </p>
                        <Button variant="secondary" size="sm" className="mt-3">
                          Enable 2FA
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      Account Actions
                    </h4>
                    <Button
                      variant="secondary"
                      className="w-full text-left justify-start"
                    >
                      Download My Data
                    </Button>
                    <Button
                      variant="secondary"
                      className="w-full text-left justify-start text-red-600 hover:text-red-700"
                    >
                      Delete Account
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}

        {activeTab === "achievements" && (
          <div className="lg:col-span-3">
            <Card className="p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
                Your Achievements
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl border border-blue-200 dark:border-blue-800"
                    style={{
                      animationDelay: `${index * 100}ms`,
                      animation: "slideUp 0.6s ease-out forwards",
                    }}
                  >
                    <div className="text-3xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 dark:text-white mb-1">
                        {achievement.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {achievement.description}
                      </p>
                      <div className="flex items-center text-xs text-gray-500 dark:text-gray-500">
                        <Calendar className="h-3 w-3 mr-1" />
                        {achievement.date}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};
