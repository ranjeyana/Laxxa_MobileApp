import React, { useState, useRef , useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
  StatusBar,
  Platform,
  TextInput,
  FlatList,
  Dimensions,
  ImageBackground,
  Animated
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import CurvedArrowLeft from '../../../assets/images/home/curved_arrow_left.svg';
import CurvedArrowRight from '../../../assets/images/home/curved_arrow_right.svg';


const { width, height } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('Home');
  const [searchText, setSearchText] = useState('');
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const flatListRef = useRef(null);

   const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;
  
  const logoImage = require('../../../assets/images/Laxxa - Black.png');

  const sliderImages = [
    { id: '1', image: require('../../../assets/images/home/slide-1.png') },
    { id: '2', image: require('../../../assets/images/home/slide-2.png') },
    { id: '3', image: require('../../../assets/images/home/slide-3 (2).jpg') },
  ];

  const trendingItems = [
    {
      id: '1',
      image: require('../../../assets/images/home/trending-1.png'),
      name: 'Champagne Satin Ruched Mermaid Gown',
      price: '₹4500.00',
      sizes: ['M'],
      rating: 4.5,
      reviews: 24,
      isFavorite: false,
    },
    {
      id: '2',
      image: require('../../../assets/images/home/trending-2.png'),
      name: 'Champagne Satin Ruched Mermaid Gown',
      price: '₹4500.00',
      sizes: ['L'],
      rating: 4.8,
      reviews: 42,
      isFavorite: true,
    },
  ];

  const reviews = [
  { 
    id: '1', 
    name: 'Priya Sharma', 
    location: 'Bangalore, Karnataka', 
    rating: 5, 
    text: 'Absolutely loved the experience! The outfit was perfect for my wedding reception.',
  },
  { 
    id: '2', 
    name: 'Ananya Reddy', 
    location: 'Hyderabad, Telangana', 
    rating: 4, 
    text: 'Great quality outfits, super easy booking process. Will definitely rent again!',
  },
  { 
    id: '3', 
    name: 'Meera Nair', 
    location: 'Kochi, Kerala', 
    rating: 5, 
    text: 'The delivery was on time and the outfit was exactly as shown. Highly recommend!',
  },
  { 
    id: '4', 
    name: 'Kavya Iyer', 
    location: 'Chennai, Tamil Nadu', 
    rating: 5, 
    text: 'Incredible selection and the cleaning service is top notch. Love Laxxa!',
  },
];

  const tabIcons = {
    Home: {
      active: require('../../../assets/images/home/home-01.png'),
      inactive: require('../../../assets/images/home/home-01.png'),
      label: 'Home'
    },
    Market: {
      active: require('../../../assets/images/home/store-02.png'),
      inactive: require('../../../assets/images/home/store-02.png'),
      label: 'Market places'
    },
    Bookings: {
      active: require('../../../assets/images/home/appointment-02.png'),
      inactive: require('../../../assets/images/home/appointment-02.png'),
      label: 'Bookings'
    },
    Wardrobes: {
      active: require('../../../assets/images/home/wardrobe-01.png'),
      inactive: require('../../../assets/images/home/wardrobe-01.png'),
      label: 'Wardrobes'
    },
    Profile: {
      active: require('../../../assets/images/home/profile.png'),
      inactive: require('../../../assets/images/home/profile.png'),
      label: 'Profile'
    },
  };

  const actionIcons = {
    heart: require('../../../assets/images/home/favourite.png'), 
    heartFilled: require('../../../assets/images/home/favourite.png'),
    cart: require('../../../assets/images/home/shopping-basket-03.png'),
    star: require('../../../assets/images/home/star.png'),
  };

  const tabs = [
    { name: 'Home', ...tabIcons.Home },
    { name: 'Market', ...tabIcons.Market },
    { name: 'Bookings', ...tabIcons.Bookings },
    { name: 'Wardrobes', ...tabIcons.Wardrobes },
    { name: 'Profile', ...tabIcons.Profile },
  ];

    useEffect(() => {
    const interval = setInterval(() => {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: -20,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setCurrentSlideIndex((prevIndex) => 
          prevIndex === sliderImages.length - 1 ? 0 : prevIndex + 1
        );
        
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(slideAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
        ]).start();
      });
    }, 4000); 

    return () => clearInterval(interval);
  }, [sliderImages.length]);


  const handleCalendarPress = () => {
    Alert.alert('Calendar', 'Calendar would open here');
  };

  const handleRentPress = () => {
    Alert.alert('Rent an Outfit', 'Navigate to rent an outfit');
  };

  const handleListWardrobePress = () => {
    Alert.alert('List Your Wardrobe', 'Navigate to list your wardrobe');
  };

  const handleTrendingPress = () => {
    Alert.alert('Trending', 'Navigate to trending in location');
  };

  const handleMoreItemsPress = () => {
    Alert.alert('More Items', 'Navigate to more items');
  };

  const handleWishListPress = (itemId) => {
    navigation.navigate('WishList');
  };

  const handleItemPress = (item) => {
    Alert.alert(item.name, 'Navigate to item details');
  };

  const handleManualSlide = (index) => {
    if (index === currentSlideIndex) return;
    
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: index > currentSlideIndex ? -20 : 20,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setCurrentSlideIndex(index);
      
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start();
    });
  };

  const renderDotIndicators = () => (
    <>
      <Image
        source={require('../../../assets/images/home/text-1.png')}
        style={styles.slideTextImage}
        resizeMode="contain"
      />
      
      <View style={styles.dotContainer}>
        {sliderImages.map((_, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleManualSlide(index)}
            activeOpacity={0.7}
          >
            <View
              style={[styles.dot, currentSlideIndex === index && styles.activeDot]}
            />
          </TouchableOpacity>
        ))}
      </View>
    </>
  );

  const renderTrendingItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.trendingCard}
      onPress={() => handleItemPress(item)}
      activeOpacity={0.9}
    >
      <View style={styles.cardImageContainer}>
        <Image 
          source={item.image} 
          style={styles.cardImage}
          resizeMode="cover"
        />
        
        <TouchableOpacity 
          style={styles.favoriteIconContainer}
          onPress={() => handleFavoritePress(item.id)}
        >
          <View style={styles.favoriteCircle}>
            <Image 
              source={item.isFavorite ? actionIcons.heartFilled : actionIcons.heart}
              style={styles.favoriteIcon}
              resizeMode="contain"
            />
          </View>
        </TouchableOpacity>

        <BlurView intensity={30} tint="light" style={styles.sizeBadge}>
          <Text style={styles.sizeText}>{item.sizes.join(' · ')}</Text>
        </BlurView>

        <BlurView intensity={30} tint="light" style={styles.imageRatingContainer}>
          <Image 
            source={actionIcons.star}
            style={styles.imageStarIcon}
            resizeMode="contain"
          />
          <Text style={styles.imageRatingText}>{item.rating}</Text>
          <Text style={styles.imageReviewsText}>({item.reviews})</Text>
        </BlurView>
      </View>

      <View style={styles.cardFooter}>
        <Text 
          style={styles.itemName} 
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {item.name}
        </Text>
        <Text style={styles.itemPrice}>{item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      <SafeAreaView style={styles.safeTop}>
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
<View style={styles.header}>
  <View style={styles.leftCol}>
    <Image source={logoImage} style={styles.logo} resizeMode="contain" />
    
    <View style={styles.locationBlock}>
      <TouchableOpacity style={styles.locationTouch}>
        <MaterialIcons name="location-on" size={30} color="#000000" />
        <View style={styles.locationTextContainer}>
          <Text style={styles.locationText}>Delivery To Bangalore,560001</Text>
          <TouchableOpacity onPress={() => Alert.alert('Update Location', 'Update location pressed')}>
            <Text style={styles.updateText}>Update location</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  </View>

  <View style={styles.rightCol}>
    <View style={styles.iconGroup}>
<TouchableOpacity 
  style={styles.actionIconContainer}
  onPress={() => navigation.navigate('WishList')}  
>
  <View style={styles.blackCircle}>
    <Image 
      source={actionIcons.heart}
      style={styles.actionIcon}
      resizeMode="contain"
    />
  </View>
</TouchableOpacity>
      
      <TouchableOpacity style={styles.actionIconContainer}>
        <View style={styles.blackCircle}>
          <Image 
            source={actionIcons.cart}
            style={styles.actionIcon}
            resizeMode="contain"
          />
        </View>
      </TouchableOpacity>
    </View>
  </View>
</View>
          <View style={styles.searchRow}>
            <View style={styles.searchContainer}>
              <Feather name="search" size={20} color="#999" style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search products..."
                placeholderTextColor="#999"
                value={searchText}
                onChangeText={setSearchText}
              />
            </View>
            
            <TouchableOpacity 
              style={styles.calendarButton}
              onPress={handleCalendarPress}
              activeOpacity={0.8}
            >
              <Feather name="calendar" size={20} color="#ffffff" />
              <Text style={styles.calendarButtonText}>Calendar</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.sliderContainer}>
            <Animated.View 
    style={[
      styles.slideItem,
      {
        opacity: fadeAnim,
        transform: [{ translateX: slideAnim }]
      }
    ]}
  >
    <Image 
      source={sliderImages[currentSlideIndex].image} 
      style={styles.slideImage}
      resizeMode="cover"
    />
  </Animated.View>
            {renderDotIndicators()}
            
            <View style={styles.actionButtonsContainer}>
              <TouchableOpacity 
                style={[styles.actionButton, styles.rentButton]}
                onPress={handleRentPress}
                activeOpacity={0.8}
              >
                <Text style={styles.rentButtonText}>Rent an outfit</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                onPress={handleListWardrobePress}
                activeOpacity={0.8}
                style={styles.listButtonWrapper}
              >
                <View style={styles.listButton}>
                  <Text style={styles.listButtonText}>List your wardrobe</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.trendingSection}>
            <View style={styles.trendingHeader}>
              <TouchableOpacity 
                style={styles.trendingButton}
                onPress={handleTrendingPress}
                activeOpacity={0.8}
              >
                <Text style={styles.trendingButtonText}>Trending in location</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                onPress={handleMoreItemsPress}
                activeOpacity={0.8}
              >
                <Text style={styles.moreItemsText}>More Items</Text>
              </TouchableOpacity>
            </View>
            
            <FlatList
              data={trendingItems}
              renderItem={renderTrendingItem}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              snapToInterval={(width - 48) / 2 + 12}
              snapToAlignment="start"
              decelerationRate="fast"
              contentContainerStyle={styles.trendingListContent}
              renderToHardwareTextureAndroid
              maxToRenderPerBatch={4}
              windowSize={5}
              initialNumToRender={2}
            />
          </View>
          
          <View style={{ height: 20 }} />

<View style={styles.imageGridSection}>
  <TouchableOpacity 
    style={styles.fullWidthImageContainer}
    onPress={() => Alert.alert('Single Image 1', 'Navigate to single image 1')}
    activeOpacity={0.9}
  >
    <Image 
      source={require('../../../assets/images/home/trending_section/trend-1.png')}
      style={styles.fullWidthImage}
      resizeMode="cover"
    />
  </TouchableOpacity>

  <View style={styles.doubleImageRow}>
    <TouchableOpacity 
      style={[styles.halfImageContainer, styles.leftHalfImage]}
      onPress={() => Alert.alert('Double Image 1', 'Navigate to double image 1')}
      activeOpacity={0.9}
    >
      <Image 
        source={require('../../../assets/images/home/trending_section/trend-2.png')}
        style={styles.halfImage}
        resizeMode="cover"
      />
    </TouchableOpacity>

    <TouchableOpacity 
      style={[styles.halfImageContainer, styles.rightHalfImage]}
      onPress={() => Alert.alert('Double Image 2', 'Navigate to double image 2')}
      activeOpacity={0.9}
    >
      <Image 
        source={require('../../../assets/images/home/trending_section/trend-3.png')}
        style={styles.halfImage}
        resizeMode="cover"
      />
    </TouchableOpacity>
  </View>

<TouchableOpacity 
  style={[styles.fullWidthImageContainer, { height: 160 }]}  // reduced from 220
  onPress={() => Alert.alert('Single Image 2', 'Navigate to single image 2')}
  activeOpacity={0.9}
>
  <Image 
    source={require('../../../assets/images/home/trending_section/trend-4.png')}
    style={styles.fullWidthImage}
    resizeMode="cover"
  />
</TouchableOpacity>

  <View style={styles.doubleImageRow}>
    <TouchableOpacity 
      style={[styles.halfImageContainer, styles.leftHalfImage, {height: 220}]}
      onPress={() => Alert.alert('Double Image 3', 'Navigate to double image 3')}
      activeOpacity={0.9}
    >
      <Image 
        source={require('../../../assets/images/home/trending_section/trend-5.png')}
        style={styles.halfImage}
        resizeMode="cover"
      />
    </TouchableOpacity>

    <TouchableOpacity 
      style={[styles.halfImageContainer, styles.rightHalfImage, {height: 220}]}
      onPress={() => Alert.alert('Double Image 4', 'Navigate to double image 4')}
      activeOpacity={0.9}
    >
      <Image 
        source={require('../../../assets/images/home/trending_section/trend-6.png')}
        style={styles.halfImage}
        resizeMode="cover"
      />
    </TouchableOpacity>
  </View>
</View>

<View style={styles.howItWorksSection}>
  <View style={styles.howItWorksTabs}>
    <TouchableOpacity style={[styles.howTab, styles.howTabActive]}>
      <Text style={styles.howTabActiveText}>For Renters</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.howTab}>
      <Text style={styles.howTabInactiveText}>For Lenders</Text>
    </TouchableOpacity>
  </View>

  <View style={styles.howStepsContainer}>
    <View style={styles.howStep}>
      <View style={styles.howIconBox}>
        <Feather name="search" size={28} color="#FFFFFF" />
      </View>
      <Text style={styles.howStepTitle}>Discover</Text>
      <Text style={styles.howStepDesc} numberOfLines={3}>
        Browse thousands of{'\n'}designer outfits curated for{'\n'}every special occasion.
      </Text>
    </View>

    <CurvedArrowLeft
  width={170}
  height={190}
  style={styles.curvedArrowRight}
/>

    <View style={styles.howStep}>
      <View style={styles.howIconBox}>
        <Feather name="calendar" size={28} color="#FFFFFF" />
      </View>
      <Text style={styles.howStepTitle}>Book</Text>
      <Text style={styles.howStepDesc}>
        Select your dates, check{'\n'}availability, and book with{'\n'}secure payment.
      </Text>
    </View>


<CurvedArrowRight
  width={170}
  height={190}
  style={styles.curvedArrowLeft}
/>

    <View style={styles.howStep}>
      <View style={styles.howIconBox}>
        <Feather name="shopping-bag" size={28} color="#FFFFFF" />
      </View>
      <Text style={styles.howStepTitle}>Wear & Return</Text>
      <Text style={styles.howStepDesc}>
        Flaunt your style! We{'\n'}handle the delivery, pickup,{'\n'}and professional cleaning.
      </Text>
    </View>
  </View>
</View>

<View style={styles.browseOccasionHeader}>
  <TouchableOpacity 
    style={styles.browseOccasionButton}
    onPress={() => Alert.alert('Browse by Occasion', 'Navigate to occasions')}
    activeOpacity={0.8}
  >
    <Text style={styles.browseOccasionButtonText}>Browse by occasion</Text>
  </TouchableOpacity>

  <TouchableOpacity
    onPress={() => Alert.alert('More Items', 'Navigate to more items')}
    activeOpacity={0.8}
  >
    <Text style={styles.browseMoreItemsText}>More Items</Text>
  </TouchableOpacity>
</View>

<View style={styles.occasionGrid}>
  <View style={styles.occasionRow}>
    <TouchableOpacity 
      style={styles.occasionCard}
      onPress={() => Alert.alert('Occasion 1')}
      activeOpacity={0.9}
    >
      <Image 
        source={require('../../../assets/images/home/occasion/occasion-card-1.png')}
        style={styles.occasionImage}
        resizeMode="cover"
      />
    </TouchableOpacity>

    <TouchableOpacity 
      style={styles.occasionCard}
      onPress={() => Alert.alert('Occasion 2')}
      activeOpacity={0.9}
    >
      <Image 
        source={require('../../../assets/images/home/occasion/occasion-card-2.png')}
        style={styles.occasionImage}
        resizeMode="cover"
      />
    </TouchableOpacity>
  </View>

  <View style={styles.occasionRow}>
    <TouchableOpacity 
      style={styles.occasionCard}
      onPress={() => Alert.alert('Occasion 3')}
      activeOpacity={0.9}
    >
      <Image 
        source={require('../../../assets/images/home/occasion/occasion-card-3.png')}
        style={styles.occasionImage}
        resizeMode="cover"
      />
    </TouchableOpacity>

    <TouchableOpacity 
      style={styles.occasionCard}
      onPress={() => Alert.alert('Occasion 4')}
      activeOpacity={0.9}
    >
      <Image 
        source={require('../../../assets/images/home/occasion/occasion-card-4.png')}
        style={styles.occasionImage}
        resizeMode="cover"
      />
    </TouchableOpacity>
  </View>
</View>

<ImageBackground
  source={require('../../../assets/images/home/why-choose-us/why-bg.png')}
  style={styles.whyChooseSection}
  resizeMode="cover"
>
  <View style={styles.whyChooseOverlay}>
    <Text style={styles.whyChooseTitle}>Why Choose Us</Text>

    <View style={styles.whyChooseItem}>
      <Image 
        source={require('../../../assets/images/home/why-choose-us/why-authentic.png')}
        style={styles.whyChooseIcon}
        resizeMode="contain"
      />
      <Text style={styles.whyChooseItemTitle}>Authentic Designers</Text>
      <Text style={styles.whyChooseItemDesc}>
        Every item is verified for{'\n'}authenticity and{'\n'}maintained to the highest{'\n'}luxury standards.
      </Text>
    </View>

    <View style={styles.whyChooseItem}>
      <Image 
        source={require('../../../assets/images/home/why-choose-us/why-cleaning.png')}
        style={styles.whyChooseIcon}
        resizeMode="contain"
      />
      <Text style={styles.whyChooseItemTitle}>Premium Cleaning</Text>
      <Text style={styles.whyChooseItemDesc}>
        Professional eco-friendly{'\n'}dry cleaning after every{'\n'}rental ensures your outfit{'\n'}is as good as new.
      </Text>
    </View>

    <View style={styles.whyChooseItem}>
      <Image 
        source={require('../../../assets/images/home/why-choose-us/why-support.png')}
        style={styles.whyChooseIcon}
        resizeMode="contain"
      />
      <Text style={styles.whyChooseItemTitle}>Dedicated Support</Text>
      <Text style={styles.whyChooseItemDesc}>
        Our fashion experts are{'\n'}available 24/7 to help you{'\n'}with styling, sizing, and{'\n'}logistics.
      </Text>
    </View>
  </View>
</ImageBackground>

<View style={styles.reviewsHeader}>
  <View style={styles.reviewsTitleButton}>
    <Text style={styles.reviewsTitleText}>Customer Reviews</Text>
  </View>
</View>

<FlatList
  data={reviews}
  keyExtractor={(item) => item.id}
  horizontal
  showsHorizontalScrollIndicator={false}
  contentContainerStyle={styles.reviewsListContent}
  renderItem={({ item }) => (
    <LinearGradient
      colors={['#FDFDF5', '#f7eac1']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.reviewCard}
    >
      <View style={styles.reviewCardTop}>
        <Image
          source={item.avatar}
          style={styles.reviewAvatar}
          resizeMode="cover"
        />
        <View style={styles.reviewMeta}>
          <Text style={styles.reviewName}>{item.name}</Text>
          <Text style={styles.reviewLocation}>{item.location}</Text>
        </View>
      </View>

      <View style={styles.reviewStars}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Feather
            key={star}
            name="star"
            size={16}
            color={star <= item.rating ? '#000000' : '#CCCCCC'}
            style={{ marginRight: 3 }}
          />
        ))}
      </View>

<Text style={styles.reviewText}>
  <Text style={styles.reviewQuote}>{`\u201C`}</Text>
  {item.text}
</Text>
    </LinearGradient>
  )}
/>

<View style={styles.footer}>
  <Image
    source={require('../../../assets/images/Laxxa.png')}
    style={styles.footerLogo}
    resizeMode="contain"
  />

  <Text style={styles.footerTagline}>
    Redefining fashion consumption{'\n'}through sustainable luxury rentals
  </Text>

  <View style={styles.footerDivider} />

  <View style={styles.footerLinksRow}>
    <View style={styles.footerLinksCol}>
      {['Wedding Wear', 'Evening Gowns', 'Sherwanis', 'Designer Dresses', 'Traditional Wear'].map((item) => (
        <TouchableOpacity key={item} onPress={() => Alert.alert(item)}>
          <Text style={styles.footerLink}>{item}</Text>
        </TouchableOpacity>
      ))}
    </View>

    <View style={styles.footerLinksCol}>
      {['About Us', 'How it Works', 'Lender Program', 'Blog', 'FAQs', 'Contact'].map((item) => (
        <TouchableOpacity key={item} onPress={() => Alert.alert(item)}>
          <Text style={styles.footerLink}>{item}</Text>
        </TouchableOpacity>
      ))}
    </View>
  </View>

  <View style={styles.footerDivider} />

  <View style={styles.footerPolicyCol}>
    {['Terms of Service', 'Privacy Policy', 'Refund Policy', 'Damage Policy', 'Cookie Policy'].map((item) => (
      <TouchableOpacity key={item} onPress={() => Alert.alert(item)}>
        <Text style={styles.footerLink}>{item}</Text>
      </TouchableOpacity>
    ))}
  </View>
</View>
        </ScrollView>
      </SafeAreaView>

      <View style={styles.bottomBar}>
        {tabs.map((tab, index) => (
          <TouchableOpacity
            key={index}
            style={styles.tabItem}
            onPress={() => setActiveTab(tab.name)}
          >
            <Image 
              source={activeTab === tab.name ? tab.active : tab.inactive}
              style={styles.tabIcon}
              resizeMode="contain"
            />
            <Text 
              style={[
                styles.tabLabel,
                { color: activeTab === tab.name ? '#FFECB2' : '#FFFFFF' }
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  safeTop: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
header: {
  flexDirection: 'row',
  justifyContent: 'space-between',
   alignItems: 'flex-start',
  paddingHorizontal: 20,
  paddingTop: 4,
  paddingBottom: 12,
},
leftCol: {
  flex: 1,
},
logo: {
  width: 100,
  height: 40,
  marginTop: -4,
  marginBottom: 8,
},
locationBlock: {
  marginTop: 4,
},
locationTouch: {
  flexDirection: 'row',
  alignItems: 'flex-start',
},
locationTextContainer: {
  flex: 1,
  marginLeft: 6,
},
locationText: {
  fontSize: 16,
  fontFamily: 'Monrope-SemiBold',
  color: '#333',
  marginBottom: 2,
},
updateText: {
  fontSize: 13,
  fontFamily: 'Monrope-Medium',
  color: '#666',
  textDecorationLine: 'underline',
},
  rightCol: {
    justifyContent: 'flex-start',
    paddingTop: 50
  },
  iconGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -12,
    gap: 12,
  },
  actionIconContainer: {
    padding: 4,
  },
  blackCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionIcon: {
    width: 20,
    height: 20,
    tintColor: '#FFFFFF',
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 16,
    gap: 12,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: Platform.OS === 'ios' ? 12 : 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Monrope-Regular',
    color: '#333',
    padding: 0,
  },
  calendarButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000000',
    paddingHorizontal: 16,
    paddingVertical: Platform.OS === 'ios' ? 12 : 8,
    borderRadius: 10,
    gap: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  calendarButtonText: {
    fontSize: 14,
    fontFamily: 'Monrope-Medium',
    color: '#ffffff',
  },
  sliderContainer: {
    height: height * 0.8,
    width: width,
    marginBottom: 20,
    position: 'relative',
  },
  flatList: {
    flex: 1,
  },
  slideItem: {
    width: width,
    height: '100%',
    overflow: 'hidden',
  },
  slideImage: {
    width: width,
    height: '100%',
    resizeMode: 'contain', 
  },
  slideTextImage: {
    position: 'absolute',
    bottom: 140,
    left: 10,     
    width: 300,   
    height: 300,  
    zIndex: 2,    
  },
  dotContainer: {
    position: 'absolute',
    bottom: 210,
    left: 190,    
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    zIndex: 1,   
  },
  dot: {
    width: 20,
    height: 20,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#ffffff',
    width: 20,
  },
  actionButtonsContainer: {
    position: 'absolute',
    bottom: 10,
    left: 20,
    right: 20,
    flexDirection: 'column',
    gap: 16,
    zIndex: 3,
  },
  actionButton: {
    width: '100%',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  rentButton: {
    backgroundColor: '#1f1e1e',
  },
  rentButtonText: {
    fontSize: 18,
    fontFamily: 'Monrope-SemiBold',
    color: '#FFFFFF',
  },
  listButtonWrapper: {
    width: '100%',
    borderRadius: 15,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.6)',
  },
  listButton: {
    width: '100%',
    paddingVertical: 16,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',  
  },
  listButtonText: {
    fontSize: 18,
    fontFamily: 'Monrope-SemiBold',
    color: '#000000',
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  
  trendingSection: {
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  trendingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  trendingButton: {
    backgroundColor: '#000000',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  trendingButtonText: {
    fontSize: 14,
    fontFamily: 'Monrope-Medium',
    color: '#FFFFFF',
  },
  moreItemsText: {
    fontSize: 18,
    fontFamily: 'Monrope-Medium',
    fontWeight: 'bold',
    color: '#000000',
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    paddingBottom: 2,
    alignSelf: 'flex-start',
  },
  trendingListContent: {
    paddingRight: 20,
    gap: 12,
  },
  
  // Card Styles
  trendingCard: {
    width: (width - 48) / 2,
    backgroundColor: '#FFFFFF',
    marginRight: 12,
    marginBottom: 5,
  },
  cardImageContainer: {
    width: '100%',
    height: 220,
    position: 'relative',
    backgroundColor: '#F5F5F5',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  favoriteIconContainer: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 3,
  },
  favoriteCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  favoriteIcon: {
    width: 16,
    height: 16,
    tintColor: '#FF0000',
  },
  
  sizeBadge: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    overflow: 'hidden',
    zIndex: 3,
  },
  sizeText: {
    color: '#000000',
    fontSize: 10,
    fontFamily: 'Monrope-Medium',
    fontWeight: '600',
  },
  
  imageRatingContainer: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderColor: '#ffffff',
    borderRadius: 20, 
    gap: 4,
    overflow: 'hidden',
    zIndex: 3,
  },
  imageStarIcon: {
    width: 10,
    height: 10,
    tintColor: '#000000',
  },
  imageRatingText: {
    fontSize: 9,
    fontFamily: 'Monrope-SemiBold',
    color: '#000000',
    fontWeight: '600',
  },
  imageReviewsText: {
    fontSize: 8,
    fontFamily: 'Monrope-Regular',
    color: '#333333',
  },
  
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingTop: 8,
    paddingHorizontal: 0,
    minHeight: 40,
  },
  itemName: {
    fontSize: 12,
    fontFamily: 'Monrope-SemiBold',
    color: '#333333',
    flex: 1,
    marginRight: 4,
    lineHeight: 16,
    flexWrap: 'wrap',
  },
  itemPrice: {
    fontSize: 12,
    fontFamily: 'Monrope-Bold',
    color: '#000000',
    alignSelf: 'flex-start',
  },


imageGridSection: {
  paddingHorizontal: 20,
  marginBottom: 10,
},

fullWidthImageContainer: {
  width: '100%',
  height: 220,
  borderRadius: 15,
  overflow: 'hidden',
  position: 'relative',
  marginBottom: 16,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 3,
},

fullWidthImage: {
  width: '100%',
  height: '100%',
},

imageOverlay: {
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  paddingVertical: 15,
  paddingHorizontal: 20,
  backgroundColor: 'rgba(0, 0, 0, 0.3)',
},

overlayText: {
  color: '#FFFFFF',
  fontSize: 18,
  fontFamily: 'Monrope-SemiBold',
  textShadowColor: 'rgba(0, 0, 0, 0.5)',
  textShadowOffset: { width: 0, height: 1 },
  textShadowRadius: 4,
},

doubleImageRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginBottom: 16,
  gap: 12,
},

halfImageContainer: {
  flex: 1,
  height: 300,
  borderRadius: 15,
  overflow: 'hidden',
  position: 'relative',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 3,
},

leftHalfImage: {
  marginRight: 6,
},

rightHalfImage: {
  marginLeft: 6,
},

halfImage: {
  width: '100%',
  height: '100%',
},

halfImageOverlay: {
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  paddingVertical: 10,
  paddingHorizontal: 12,
  backgroundColor: 'rgba(0, 0, 0, 0.3)',
},

halfOverlayText: {
  color: '#FFFFFF',
  fontSize: 14,
  fontFamily: 'Monrope-SemiBold',
  textShadowColor: 'rgba(0, 0, 0, 0.5)',
  textShadowOffset: { width: 0, height: 1 },
  textShadowRadius: 4,
},

howItWorksSection: {
  backgroundColor: '#1a1a1a',
  marginHorizontal: -20,    
  marginBottom: 30,
  borderRadius: 0,
  paddingVertical: 32,
  paddingHorizontal: 24,
},
howItWorksTabs: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center', 
  marginBottom: 40,
  gap: 16,
},
howTab: {
  paddingVertical: 8,
  paddingHorizontal: 18,
  borderRadius: 10,
},
howTabActive: {
  backgroundColor: '#FFFFFF',
},
howTabActiveText: {
  fontSize: 15,
  fontFamily: 'Monrope-SemiBold',
  color: '#000000',
},
howTabInactiveText: {
  fontSize: 15,
  fontFamily: 'Monrope-Medium',
  color: '#FFFFFF',

},
howStepsContainer: {
  alignItems: 'center',
},
howStep: {
  alignItems: 'center',
  paddingHorizontal: 20,
},
howIconBox: {
  width: 64,
  height: 64,
  borderRadius: 16,
  backgroundColor: '#2e2e2e',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: 14,
},
howStepTitle: {
  fontSize: 22,
  fontFamily: 'Monrope-SemiBold',
  color: '#FFFFFF',
  marginBottom: 8,
},
howStepDesc: {
  fontSize: 14,
  fontFamily: 'Monrope-Regular',
  color: '#AAAAAA',
  textAlign: 'center',
  lineHeight: 22,
},
curvedArrowRight: {
  width: 180,
  height: 180,
  alignSelf: 'flex-start',
  marginLeft: 70,
  position: 'relative',
  top: 30,  
  marginTop: -20,  
  marginBottom: -80, 
},
curvedArrowLeft: {
  width: 150,
  height: 150,
  alignSelf: 'flex-end',
  marginRight: 50,
  position: 'relative',
  top: 90,  
  marginTop: -20,  
  marginBottom: -80, 
},
browseOccasionHeader: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingHorizontal: 20,
  marginTop: 24,
  marginBottom: 16,
},
browseOccasionButton: {
  backgroundColor: '#000000',
  paddingVertical: 10,
  paddingHorizontal: 16,
  borderRadius: 8,
},
browseOccasionButtonText: {
  fontSize: 14,
  fontFamily: 'Monrope-Medium',
  color: '#FFFFFF',
},
browseMoreItemsText: {
  fontSize: 18,
  fontFamily: 'Monrope-Medium',
  fontWeight: 'bold',
  color: '#000000',
  borderBottomWidth: 1,
  borderBottomColor: '#000000',
  paddingBottom: 2,
},

occasionGrid: {
  paddingHorizontal: 20,
  gap: 12,
  marginBottom: 30,
},
occasionRow: {
  flexDirection: 'row',
  gap: 12,
},
occasionCard: {
  flex: 1,
  height: 270,
  overflow: 'hidden',
  backgroundColor: '#F5F5F5',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 3,
},
occasionImage: {
  width: '100%',
  height: '100%',
},

whyChooseOverlay: {
  paddingVertical: 40,
  paddingHorizontal: 24,
},

whyChooseSection: {
  marginHorizontal: -20,
  marginBottom: 30,
},
whyChooseTitle: {
  fontSize: 26,
  fontFamily: 'Monrope-SemiBold',
  color: '#FFFFFF',
  textAlign: 'center',
  marginBottom: 40,
},
whyChooseItem: {
  alignItems: 'center',
  marginBottom: 48,
},
whyChooseIcon: {
  width: 64,
  height: 64,
  marginBottom: 16,
  tintColor: '#FFFFFF',   
},
whyChooseItemTitle: {
  fontSize: 22,
  fontFamily: 'Monrope-SemiBold',
  color: '#FFFFFF',
  marginBottom: 10,
  textAlign: 'center',
},
whyChooseItemDesc: {
  fontSize: 14,
  fontFamily: 'Monrope-Regular',
  color: '#DDDDDD',
  textAlign: 'center',
  lineHeight: 22,
  paddingHorizontal: 10,
},

reviewsHeader: {
  paddingHorizontal: 20,
  marginTop: 24,
  marginBottom: 16,
},
reviewsTitleButton: {
  backgroundColor: '#000000',
  paddingVertical: 10,
  paddingHorizontal: 16,
  borderRadius: 8,
  alignSelf: 'flex-start',
},
reviewsTitleText: {
  fontSize: 14,
  fontFamily: 'Monrope-Medium',
  color: '#FFFFFF',
},
reviewsListContent: {
  paddingHorizontal: 20,
  paddingBottom: 10,
  gap: 12,
},

reviewCard: {
  width: width * 0.45,
  borderRadius: 0,
  padding: 20,
  borderWidth: 0,
  borderColor: '#EEEEEE',
  minHeight: 280,
},

reviewCardTop: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 16,
  zIndex: 1,
},

reviewAvatar: {
  width: 56,
  height: 56,
  borderRadius: 28,
  marginRight: 12,
  backgroundColor: '#E0E0E0',
},

reviewMeta: {
  flex: 1,
  zIndex: 1,
},

reviewName: {
  fontSize: 16,
  fontFamily: 'Monrope-SemiBold',
  color: '#111111',
  marginBottom: 4,
},

reviewLocation: {
  fontSize: 10,
  fontFamily: 'Monrope-Regular',
  color: '#888888',
},

reviewStars: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 12,
  zIndex: 1,
},


reviewQuote: {
  fontSize: 40,
  fontFamily: 'Monrope-Bold',
  color: '#000000',
  lineHeight: 30,
  opacity: 0.8,
},

reviewText: {
  fontSize: 13,
  fontFamily: 'Monrope-Regular',
  color: '#444444',
  lineHeight:20 ,
  zIndex: 1,
},

footer: {
  backgroundColor: '#2a2a2a',
  marginHorizontal: -20,
  paddingHorizontal: 24,
  paddingLeft: 36, 
  paddingTop: 40,
  paddingBottom: 120,
},
footerLogo: {
  width: 120,
  height: 44,
  marginBottom: 16,
},
footerTagline: {
  fontSize: 15,
  fontFamily: 'Monrope-Regular',
  color: '#FFFFFF',
  lineHeight: 24,
  marginBottom: 8,
},
footerDivider: {
  height: 1,
  backgroundColor: 'rgba(255,255,255,0.12)',
  marginVertical: 24,
},
footerLinksRow: {
  flexDirection: 'row',
},
footerLinksCol: {
  flex: 1,
  gap: 20,
},
footerPolicyCol: {
  gap: 20,
},
footerLink: {
  fontSize: 15,
  fontFamily: 'Monrope-Regular',
  color: '#FFFFFF',
},
  bottomPadding: {
    height: 80,
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#000000',
    paddingVertical: 14,
    paddingBottom: Platform.OS === 'ios' ? 20 : 40,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  tabIcon: {
    width: 24,
    height: 24,
    marginBottom: 4,
  },
  tabLabel: {
    fontSize: 10,
    fontFamily: 'Monrope-Medium',
    marginTop: 2,
    textAlign: 'center',
  },
});

export default HomeScreen;