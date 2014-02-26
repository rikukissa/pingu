using UnityEngine;
using System.Collections;

public class PointsController : MonoBehaviour {

	private int points = 0;

	void OnTriggerEnter2D (Collider2D collider) {
		if(collider.tag == "IceCream") {
			Destroy(collider.gameObject);
			points++;
		}
	}
}
