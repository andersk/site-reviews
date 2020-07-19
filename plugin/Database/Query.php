<?php

namespace GeminiLabs\SiteReviews\Database;

use GeminiLabs\SiteReviews\Helpers\Arr;
use GeminiLabs\SiteReviews\Helpers\Cast;
use GeminiLabs\SiteReviews\Modules\Rating;
use GeminiLabs\SiteReviews\Review;

class Query
{
    use QuerySql;

    public $args;
    public $db;

    public function __construct()
    {
        global $wpdb;
        $this->db = $wpdb;
    }

    /**
     * @return array
     */
    public function export($offset, $limit)
    {
        $sql = $this->db->prepare("
            SELECT r.*,
                GROUP_CONCAT(DISTINCT apt.post_id) AS post_ids,
                GROUP_CONCAT(DISTINCT att.term_id) AS term_ids,
                GROUP_CONCAT(DISTINCT aut.user_id) AS user_ids
            FROM {$this->table('ratings')} AS r
            LEFT JOIN {$this->table('assigned_posts')} AS apt ON r.ID = apt.rating_id
            LEFT JOIN {$this->table('assigned_terms')} AS att ON r.ID = att.rating_id
            LEFT JOIN {$this->table('assigned_users')} AS aut ON r.ID = aut.rating_id
            GROUP BY r.ID
            ORDER BY r.ID
            LIMIT %d, %d
        ", $offset, $limit);
        return $this->db->get_results($this->sql($sql, 'export-values'), ARRAY_A);
    }

    /**
     * @return array
     */
    public function import($offset, $limit, $exportKey)
    {
        $sql = $this->db->prepare("
            SELECT m.post_id, m.meta_value
            FROM {$this->db->postmeta} AS m
            INNER JOIN {$this->db->posts} AS p ON m.post_id = p.ID
            WHERE p.post_type = '%s' AND m.meta_key = '%s'
            ORDER BY m.meta_id
            LIMIT %d, %d
        ", glsr()->post_type, $exportKey, $offset, $limit);
        return $this->db->get_results($this->sql($sql, 'import-values'), ARRAY_A);
    }

    /**
     * @return array
     */
    public function ratings(array $args = [])
    {
        $this->setArgs($args);
        $join = implode(' ', $this->sqlClauses([], 'join'));
        $and = implode(' ', $this->sqlClauses([], 'and'));
        $sql = $this->sql("
            SELECT r.rating, r.type, COUNT(r.rating) AS count
            FROM {$this->table('ratings')} AS r {$join}
            WHERE r.is_approved = 1 {$and}
            GROUP BY r.type, r.rating
        ", 'rating');
        return $this->normalizeRatings($this->db->get_results($sql, ARRAY_A));
    }

    /**
     * @todo make sure we delete the cached review when modifying it
     * @param int $postId
     * @return Review
     */
    public function review($postId)
    {
        $reviewId = Cast::toInt($postId);
        if (($review = glsr(Cache::class)->get($reviewId, 'reviews')) instanceof Review) {
            return $review;
        }
        $sql = $this->sql("
            {$this->sqlSelect()}
            {$this->sqlFrom()}
            {$this->sqlJoin()}
            {$this->sqlJoinPivots()}
            WHERE r.review_id = {$reviewId}
            GROUP BY r.ID
        ", 'review');
        $review = new Review($this->db->get_row($sql));
        if ($review->isValid()) {
            glsr(Cache::class)->store($reviewId, 'reviews', $review);
        }
        return $review;
    }

    /**
     * @return array
     */
    public function reviews(array $args = [], array $postIds = [])
    {
        $this->setArgs($args);
        if (!empty($postIds)) {
            $postIds = implode(',', Arr::uniqueInt($postIds));
        } else {
            $postIds = "SELECT ids.* FROM (
                SELECT r.review_id
                {$this->sqlFrom()}
                {$this->sqlJoinClauses()}
                {$this->sqlWhere()}
                GROUP BY r.review_id
                {$this->sqlOrderBy()}
                {$this->sqlLimit()}
                {$this->sqlOffset()}
            ) as ids";
        }
        $sql = $this->sql("
            {$this->sqlSelect()}
            {$this->sqlFrom()}
            {$this->sqlJoin()}
            {$this->sqlJoinPivots()}
            WHERE r.review_id in ({$postIds})
            GROUP BY r.ID 
        ", 'reviews');
        $results = $this->db->get_results($sql);
        foreach ($results as &$result) {
            $result = new Review($result);
            glsr(Cache::class)->store($result->ID, 'reviews', $result);
        }
        return $results;
    }

    /**
     * @param int $postId
     * @return array
     */
    public function revisionIds($postId)
    {
        $sql = $this->sql($this->db->prepare("
            SELECT ID
            FROM {$this->db->posts}
            WHERE post_parent = %d AND post_type = 'revision'
        ", $postId), 'revision-ids');
        return $this->db->get_col($sql);
    }

    /**
     * @return int
     */
    public function totalReviews(array $args = [], array $reviews = [])
    {
        $this->setArgs($args);
        if (empty($this->sqlLimit()) && !empty($reviews)) {
            return count($reviews);
        }
        $sql = $this->sql("
            SELECT COUNT(DISTINCT r.ID) as count
            {$this->sqlFrom()}
            {$this->sqlJoinClauses()}
            {$this->sqlWhere()}
        ", 'total-reviews');
        return (int) $this->db->get_var($sql);
    }

    /**
     * @param int $postId
     * @return bool
     */
    public function hasRevisions($postId)
    {
        $sql = $this->sql("
            SELECT COUNT(*) 
            FROM {$this->db->posts}
            WHERE post_type = 'revision' AND post_parent = {$postId}
        ", 'has-revisions');
        return (int) $this->db->get_var($sql) > 0;
    }

    /**
     * @return array
     */
    protected function normalizeRatings(array $ratings = [])
    {
        $normalized = [];
        foreach ($ratings as $result) {
            $type = $result['type'];
            if (!array_key_exists($type, $normalized)) {
                $normalized[$type] = glsr(Rating::class)->emptyArray();
            }
            $normalized[$type] = Arr::set($normalized[$type], $result['rating'], $result['count']);
        }
        return $normalized;
    }

    /**
     * @return void
     */
    public function setArgs(array $args = [])
    {
        $this->args = (new NormalizeQueryArgs($args))->toArray();
    }
}
