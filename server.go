package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/gorilla/mux"
	"github.com/mongodb/mongo-go-driver/bson"
	"github.com/mongodb/mongo-go-driver/bson/primitive"
	"github.com/mongodb/mongo-go-driver/mongo"
)

func server(r *mux.Router) {
	r.PathPrefix("/public").Handler(http.FileServer(http.Dir("./public")))

	r.PathPrefix("/").HandlerFunc(indexHandler)

	srv := &http.Server{
		Handler:      r,
		Addr:         "127.0.0.1:8080",
		WriteTimeout: 15 * time.Second,
		ReadTimeout:  15 * time.Second,
	}

	log.Fatal(srv.ListenAndServe())
}

func indexHandler(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, "./public/index.html")
}

func readRoute(collection *mongo.Collection, r *mux.Router) {
	r.HandleFunc("/api/beerlist", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusCreated)

		// array of docs
		var results []*Beer

		// find all beers
		filter := bson.D{{}}

		cur, err := collection.Find(context.TODO(), filter)

		if err != nil {
			log.Fatal(err)
		}

		for cur.Next(context.TODO()) {
			var elem Beer
			err := cur.Decode(&elem)
			if err != nil {
				log.Fatal(err)
			}
			results = append(results, &elem)
		}

		if err := cur.Err(); err != nil {
			log.Fatal(err)
		}

		json.NewEncoder(w).Encode(results)

		cur.Close(context.TODO())
	}).Methods("GET")
}

func createRoute(collection *mongo.Collection, r *mux.Router) {
	r.HandleFunc("/api/beerlist", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusCreated)

		beer := Beer{}

		json.NewDecoder(r.Body).Decode(&beer)

		insertResult, err := collection.InsertOne(context.TODO(), beer)

		if err != nil {
			log.Fatal(err)
		}

		fmt.Println("Inserted a single document: ", insertResult.InsertedID)

		// Find beer by inserted id

		var result Beer

		_id := bson.E{"_id", insertResult.InsertedID}
		filter := bson.D{_id}

		err = collection.FindOne(context.TODO(), filter).Decode(&result)
		if err != nil {
			log.Fatal(err)
		}

		// send JSON back
		json.NewEncoder(w).Encode(result)

	}).Methods("POST")
}

func updateRoute(collection *mongo.Collection, r *mux.Router) {
	r.HandleFunc("/api/beerlist/{id}", func(w http.ResponseWriter, r *http.Request) {
		type res struct {
			CurrentDraft bool `json:"currentdraft"`
		}

		cD := res{}

		json.NewDecoder(r.Body).Decode(&cD)

		vars := mux.Vars(r)
		id := toObjectID(vars["id"])
		_id := bson.E{"_id", id}

		filter := bson.D{_id}

		update := bson.D{
			{"$set", bson.D{
				{"currentdraft", cD.CurrentDraft},
			}},
		}

		updateResult, err := collection.UpdateOne(context.TODO(), filter, update)
		if err != nil {
			log.Fatal(err)
		}

		fmt.Printf("Matched %v documents and updated %v documents.\n", updateResult.MatchedCount, updateResult.ModifiedCount)
	}).Methods("PUT")
}

func deleteRoute(collection *mongo.Collection, r *mux.Router) {
	r.HandleFunc("/api/beerlist/{id}", func(w http.ResponseWriter, r *http.Request) {
		vars := mux.Vars(r)
		id := toObjectID(vars["id"])
		_id := bson.E{"_id", id}

		filter := bson.D{_id}

		deleteResult, err := collection.DeleteOne(context.TODO(), filter)
		if err != nil {
			log.Fatal(err)
		}
		fmt.Printf("Deleted %v document in the beers collection\n", deleteResult.DeletedCount)
	}).Methods("DELETE")
}

func seedRoute(collection *mongo.Collection, r *mux.Router) {
	r.HandleFunc("/seed", func(w http.ResponseWriter, r *http.Request) {
		beers := seedData()

		var bInt []interface{}

		for _, b := range beers {
			bInt = append(bInt, b)
		}

		insertManyResult, err := collection.InsertMany(context.TODO(), bInt)

		if err != nil {
			log.Fatal(err)
		}
		fmt.Println("Inserted multiple documents: ", insertManyResult.InsertedIDs)
	})
}

func toObjectID(id string) primitive.ObjectID {
	_id, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		log.Fatal(err)
	}
	return _id
}
