new Vue({
  el: "#lessonStore",
  data: {
    message: "Welcome to After School Classes Checkout",
    showCheckoutForm: false, // Toggle for showing the checkout form
    cart: [], // Cart stores the lessons you add
    lessons: [
      // Displays 10 lessons
      {
        id: 1,
        subject: "Math",
        location: "Room 101",
        price: 50,
        spaces: 5,
        image: "./Images/Maths.jpeg",
      },
      {
        id: 2,
        subject: "Science",
        location: "Room 102",
        price: 60,
        spaces: 3,
        image: "./Images/Science.jpeg",
      },
      {
        id: 3,
        subject: "Art",
        location: "Room 103",
        price: 40,
        spaces: 2,
        image: "./Images/Art.jpeg",
      },
      {
        id: 4,
        subject: "Geography",
        location: "Room 104",
        price: 70,
        spaces: 10,
        image: "./Images/Geography.jpeg",
      },
      {
        subject: "English",
        location: "Room 105",
        price: 100,
        spaces: 8,
        image: "./Images/English.jpeg",
      },
      {
        id: 6,
        subject: "Music",
        location: "Room 106",
        price: 500,
        spaces: 25,
        image: "./Images/Music.jpeg",
      },
      {
        id: 7,
        subject: "Economics",
        location: "Room 107",
        price: 20,
        spaces: 3,
        image: "./Images/Economics.jpeg",
      },
      {
        id: 8,
        subject: "Account",
        location: "Room 108",
        price: 68,
        spaces: 9,
        image: "./Images/Accounts.jpeg",
      },
      {
        id: 9,
        subject: "Physical Education",
        location: "Room 109",
        price: 100,
        spaces: 21,
        image: "./Images/PE.jpeg",
      },
      {
        id: 10,
        subject: "Literature",
        location: "Room 110",
        price: 100,
        spaces: 6,
        image: "./Images/Literature.jpeg",
      },
    ],
    sortAttribute: "subject", // The drop in icon will have subject as default
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
      // Filter lessons based on search query and sort the result
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
      // Check if firstName contains only letters and phone contains only numbers
      const nameRegex = /^[a-zA-Z]+$/;
      const phoneRegex = /^[0-9]+$/;
      return (
        nameRegex.test(this.order.firstName) &&
        phoneRegex.test(this.order.phone)
      );
    },
  },
  methods: {
    // This will substract the number of space by 1 when you click on add to cart
    addToCart(lesson) {
      if (lesson.spaces > 0) {
        this.cart.push(lesson);
        lesson.spaces--;
      }
    },
    showCheckoutPage() {
      // Redirect or show checkout page logic here
      alert("Proceeding to checkout with " + this.cart.length + " items.");
    },
    // This will add the number of space by 1 because you remove it from cart
    removeFromCart(lesson) {
      const index = this.cart.indexOf(lesson);
      if (index > -1) {
        this.cart.splice(index, 1);
        lesson.spaces += 1;
      }
    },
    // This will toggle from ascending to descending
    toggleSortOrder() {
      this.sortOrder = this.sortOrder === "asc" ? "desc" : "asc";
    },
    // This will show the checkout form
    showCheckoutPage() {
      this.showCheckoutForm = !this.showCheckoutForm;
    },
    // This will enable us to return to the main page
    backToMainPage() {
      this.showCheckoutForm = false;
    },
    // This will enable us to submit the order and if there is an invalid name or phone number it will prevent you from placing an order until a valid name or phone number is entered.
    submitOrder() {
      if (this.isCheckoutValid) {
        alert("Order placed successfully!");
        this.resetOrder();
      } else {
        alert("Please provide valid Name and Phone Number.");
      }
    },
    // This will reset the orders
    resetOrder() {
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
      // Trigger reactivity on search query change
      this.searchQuery = this.searchQuery.trim();
    },
  },
});
