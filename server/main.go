package main

import (
	"context"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"

	"github.com/mongodb/mongo-go-driver/bson/primitive"

	"github.com/gorilla/mux"
	"github.com/mongodb/mongo-go-driver/mongo"
)

// Beer :
type Beer struct {
	BreweryName  string             `json:"Brewery Name"`
	BeerName     string             `json:"Beer Name"`
	BeerStyle    string             `json:"Beer Style"`
	ABV          string             `json:"ABV"`
	IBU          string             `json:"IBU"`
	CurrentDraft bool               `json:"currentDraft"`
	ID           primitive.ObjectID `json:"_id" bson:"_id,omitempty"`
}

// Collection :
type Collection struct {
	// contains filtered or unexported fields
}

func main() {
	collection := db()
	r := mux.NewRouter()

	seedRoute(collection, r)
	readRoute(collection, r)
	createRoute(collection, r)
	updateRoute(collection, r)
	deleteRoute(collection, r)

	http.Handle("/", r)

	// run server
	server(r)
}

func db() *mongo.Collection {
	client, err := mongo.Connect(context.TODO(), "mongodb://localhost:27017")
	if err != nil {
		log.Fatal(err)
	}
	// Check the connection
	err = client.Ping(context.TODO(), nil)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("Connected to MongoDB!")
	collection := client.Database("beerListGo").Collection("beers")
	return collection
}

func seedData() []Beer {
	jsonFile, err := os.Open("beer_list.json")
	// if we os.Open returns an error then handle it
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println("Successfully Opened users.json")
	// defer the closing of our jsonFile so that we can parse it later on
	defer jsonFile.Close()

	byteValue, _ := ioutil.ReadAll(jsonFile)

	var beers []Beer

	json.Unmarshal(byteValue, &beers)

	for _, b := range beers {
		b.CurrentDraft = false
	}

	return beers
}
