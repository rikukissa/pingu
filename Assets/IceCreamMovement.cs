using UnityEngine;
using System.Collections;

public class IceCreamMovement : MonoBehaviour {

	public float floatingSpeed = 1f;
	public float floatingRange = 5f;

	private float originalY;
	private int floatingDirection = 1;


	// Use this for initialization
	void Start () {
		originalY = transform.position.y;
	}

	void FixedUpdate() {
		Vector3 position = transform.position;
		position.y += floatingSpeed * floatingDirection;
		transform.position = position;

		if (Mathf.Abs (position.y - originalY) > floatingRange) {
			floatingDirection *= -1;
		}
	}

	// Update is called once per frame
	void Update () {
	
	}
}
