new Vue({
  el: "#lessonStore",
  data: {
    message: "Welcome to After School Classes Checkout",
    showCheckoutForm: false, // Toggle for showing the checkout form
    cart: [], // Cart stores the lessons you add
    lessons: [
      {
        id: 1,
        subject: "Math",
        location: "Room 101",
        price: 50,
        spaces: 5,
        image: "/Images/Maths.jpeg",
      },
      {
        id: 2,
        subject: "Science",
        location: "Room 102",
        price: 60,
        spaces: 3,
        image: "/Images/Science.jpeg",
      },
      {
        id: 3,
        subject: "Art",
        location: "Room 103",
        price: 40,
        spaces: 2,
        image: "/Images/Art.jpeg",
      },
      {
        id: 4,
        subject: "Geography",
        location: "Room 104",
        price: 70,
        spaces: 10,
        image: "/Images/Geography.jpeg",
      },
      {
        id: 5,
        subject: "English",
        location: "Room 105",
        price: 100,
        spaces: 8,
        image: "/Images/English.jpeg",
      },
      {
        id: 6,
        subject: "Music",
        location: "Room 106",
        price: 500,
        spaces: 25,
        image: "/Images/Music.jpeg",
      },
      {
        id: 7,
        subject: "Economics",
        location: "Room 107",
        price: 20,
        spaces: 3,
        image: "/Images/Economics.jpeg",
      },
      {
        id: 8,
        subject: "Account",
        location: "Room 108",
        price: 68,
        spaces: 9,
        image: "/Images/Accounts.jpeg",
      },
      {
        id: 9,
        subject: "Physical Education",
        location: "Room 109",
        price: 100,
        spaces: 21,
        image: "/Images/PE.jpeg",
      },
      {
        id: 10,
        subject: "Literature",
        location: "Room 110",
        price: 100,
        spaces: 6,
        image: "/Images/Literature.jpeg",
      },
    ],
    sortAttribute: "subject", // The default sort attribute
    sortOrder: "asc", // Default sorting order ascending
    searchQuery: "", // Search input for lessons
    order: {
      firstName: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      gift: false,
      delivery: "",
    },
  },
  computed: {
    sortedFilteredLessons() {
      // Filter and sort lessons
      let filteredLessons = this.lessons.filter((lesson) => {
        let searchLower = this.searchQuery.toLowerCase();
        return (
          lesson.subject.toLowerCase().includes(searchLower) ||
          lesson.location.toLowerCase().includes(searchLower) ||
          String(lesson.price).includes(searchLower) ||
          String(lesson.spaces).includes(searchLower)
        );
      });

      // Sort the filtered lessons
      return filteredLessons.slice().sort((a, b) => {
        let comparison = 0;

        if (this.sortAttribute === "subject") {
          comparison = a.subject.localeCompare(b.subject);
        } else if (this.sortAttribute === "location") {
          comparison = a.location.localeCompare(b.location);
        } else if (this.sortAttribute === "price") {
          comparison = a.price - b.price;
        } else if (this.sortAttribute === "spaces") {
          comparison = a.spaces - b.spaces;
        }

        return this.sortOrder === "asc" ? comparison : -comparison;
      });
    },
    isCheckoutValid() {
      // Validate firstName and phone inputs
      const nameRegex = /^[a-zA-Z]+$/;
      const phoneRegex = /^[0-9]+$/;
      return (
        nameRegex.test(this.order.firstName) &&
        phoneRegex.test(this.order.phone)
      );
    },
  },
  methods: {
    addToCart(lesson) {
      if (lesson.spaces > 0) {
        this.cart.push(lesson);
        lesson.spaces--;
      }
    },
    removeFromCart(lesson) {
      const index = this.cart.indexOf(lesson);
      if (index > -1) {
        this.cart.splice(index, 1);
        lesson.spaces += 1;
      }
    },
    toggleSortOrder() {
      this.sortOrder = this.sortOrder === "asc" ? "desc" : "asc";
    },
    showCheckoutPage() {
      // Go to checkout page
      this.showCheckoutForm = true;
    },
    backToMainPage() {
      this.showCheckoutForm = false;
    },
    submitOrder() {
      if (this.isCheckoutValid) {
        alert("Order placed successfully!");
        this.resetOrder();
      } else {
        alert("Please provide valid Name and Phone Number.");
      }
    },
    resetOrder() {
      // Reset the order form and the cart
      this.order = {
        firstName: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        gift: false,
        delivery: "",
      };
      this.cart = [];
      this.lessons.forEach((lesson) => {
        lesson.spaces = 5; // Reset lesson spaces or use your custom logic
      });
      this.showCheckoutForm = false;
    },
    searchLessons() {
      this.searchQuery = this.searchQuery.trim();
    },
  },
});
