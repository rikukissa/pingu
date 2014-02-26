using UnityEngine;
using System.Collections;

public class FollowPlayer : MonoBehaviour {
	public float minX = 0f;
	public float maxX = 23f;
	public GameObject player;
	
	// Update is called once per frame
	void Update () {
		Vector3 position = transform.position;
		position.x = player.transform.position.x;

		position.x = Mathf.Max (minX, position.x);
		position.x = Mathf.Min (maxX, position.x);

		transform.position = position;
	}
}
